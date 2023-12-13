<template lang="pug">
.earth-container(
@mousemove="onMouseMove" 
@mousedown="onMouseDown" 
@mouseup="onMouseUp"
@mouseenter="onMouseEnter"
@mouseleave="onMouseLeave")
    .earth(ref="earthBoxEl")
</template>
<script setup>
import * as THREE from 'three';
import { DEG2RAD, getImageData, visibilityForCoordinate, polarToCartesian } from './util'
import $http from "@/utils/http.js";

let earthBoxEl = ref(null)
let width = 500; //宽度
let radius = width / 2
let timer = null
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const camera = new THREE.PerspectiveCamera(30, 1, 1, 3000);
const scene = new THREE.Scene();
const group = new THREE.Group()

let mouseHold = false

onMounted(async () => {
    width = earthBoxEl.value?.clientWidth
    radius = width / 2
    group.add(createSphereMesh())
    group.add(await createMapMesh())
    getStData()
    render(group)
    loopRotate(group)
})

function getStData() {
    $http.get('/api/log/st').then(res => {
        console.log(res)
        group.add(createPointMesh(res.data?.filter(item => item.location.lat)))
    })
}

//创建球体mesh
function createSphereMesh() {
    const geometry = new THREE.SphereGeometry(radius, radius / 2, radius / 2)
    const material = new THREE.MeshStandardMaterial({
        color: "#05347E",
        metalness: 0,
        roughness: 0.8,
        alphaTest: 0.02
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 0);
    return mesh
}

//创建地图mesh
async function createMapMesh() {
    const geometry = new THREE.CircleGeometry(1.2, 5);
    const dotMaterial = new THREE.MeshStandardMaterial({
        color: "#ffffff",
        metalness: 0,
        roughness: 0.9,
        alphaTest: 0.02
    })
    const dotData = await getDots()
    let dotMesh = new THREE.InstancedMesh(geometry, dotMaterial, dotData.length)
    for (let i = 0; i < dotData.length; i++) {
        dotMesh.setMatrixAt(i, dotData[i])
    }
    dotMesh.renderOrder = 2;
    return dotMesh
}

function createPointMesh(points = []) {
    const dummyDot = new THREE.Object3D();
    const dotData = [];

    const geometry = new THREE.CylinderGeometry(2, 2, 2);
    geometry.translate(0, 0.5, 0);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({
        blending: THREE.AdditiveBlending,
        opacity: 1,
        transparent: false,
        color: '#D32F2F'
    });

    points.forEach(item => {
        let latlng = [item.location.lat, item.location.lon]
        const pos = polarToCartesian(Number(latlng[0]), Number(latlng[1]), radius);
        dummyDot.position.set(pos.x, pos.y, pos.z);
        const lookAt = polarToCartesian(Number(latlng[0]), Number(latlng[1]), radius + 5);
        dummyDot.lookAt(lookAt.x, lookAt.y, lookAt.z);
        dummyDot.updateMatrix();
        dotData.push(dummyDot.matrix.clone());
    })
    let dotMesh = new THREE.InstancedMesh(geometry, material, dotData.length)
    for (let i = 0; i < dotData.length; i++) {
        dotMesh.setMatrixAt(i, dotData[i])
        dotMesh.setColorAt(i, new THREE.Color('#D32F2F'))
    }
    dotMesh.renderOrder = 3;
    return dotMesh
}

//将地图图片转换点坐标集合
async function getDots() {
    const dummyDot = new THREE.Object3D();
    const imageData = await getImageData("http://blog465467.oss-cn-guangzhou.aliyuncs.com/photo/f6da4eff1610c60e9cfe0c723834685668d677391884eeb87bf428c890f54ade.png")
    const dotData = [];
    const dotResolutionX = 0.16
    const rows = radius * 0.6;
    for (let lat = -90; lat <= 90; lat += 180 / rows) {         //纬度（-90，90）
        const segmentRadius = Math.cos(Math.abs(lat) * DEG2RAD) * radius;   //半径
        const circumference = segmentRadius * Math.PI * 2;      //圆周长
        const dotsforRow = circumference * dotResolutionX;      //一行的点数=圆周长x2
        for (let x = 0; x < dotsforRow; x++) {
            const long = -180 + x * 360 / dotsforRow;                 //经度
            if (!visibilityForCoordinate(long, lat, imageData)) continue;  //检测该经纬度是否可见  
            const pos = polarToCartesian(lat, long, radius);  //极坐标转笛卡3D尔坐标
            dummyDot.position.set(pos.x, pos.y, pos.z);
            const lookAt = polarToCartesian(lat, long, radius + 5);
            dummyDot.lookAt(lookAt.x, lookAt.y, lookAt.z);
            dummyDot.updateMatrix();
            dotData.push(dummyDot.matrix.clone());  //得到三维点的矩阵
        }
    }
    return dotData
}

//渲染
function render(group) {
    scene.add(group)

    //添加投影相机
    camera.position.set(250, 250, 1000);
    camera.lookAt(group.position)

    //添加光照
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0, 0, 1);
    directionalLight.target = group;
    scene.add(directionalLight);
    // const light = new THREE.PointLight('#ffffff', 1)
    // light.target = group
    // light.position.set(10, 10, 10);
    // light.visible = true;
    // light.distance = 200;
    // scene.add(light)

    //渲染器
    renderer.setClearAlpha(0);
    renderer.setSize(width, width);
    renderer.render(scene, camera)
    earthBoxEl.value?.appendChild(renderer.domElement)
}

function loopRotate(group) {
    if (timer) {
        clearInterval(timer)
    }
    timer = setInterval(() => {
        requestAnimationFrame(() => {
            renderer.render(scene, camera)
            group.rotateY(0.005)
        })
    }, 50);
}

let mousePos = { x: 0, y: 0 }
function onMouseDown(e) {
    if (e.button == 0) {
        mouseHold = true
        mousePos = { x: e.clientX, y: e.clientY }
    }
}

function onMouseMove(e) {
    if (mouseHold) {
        let diffX = mousePos.x - e.clientX
        let diffY = mousePos.y - e.clientY
        mousePos = { x: e.clientX, y: e.clientY }
        renderer.render(scene, camera)
        // group.rotateX(-(diffY * 0.002))
        group.rotateY(-(diffX * 0.002))
    }
}

function onMouseUp() {
    mouseHold = false
}

function onMouseEnter() {
    // clearInterval(timer)
}
function onMouseLeave() {
    mouseHold = false
    // loopRotate(group)
}
</script>
<style lang='scss' scoped>
.earth-container {
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1;

    .earth {
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
}
</style>