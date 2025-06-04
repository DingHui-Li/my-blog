<template>
  <div class="footprint-map-page" v-loading="loading">
    <div class="map-container" ref="mapContainer"></div>
    <div class="drawer-mask" v-if="popup" @click="popup = false"></div>
    <div :class="['drawer', popup && 'show']">
      <div class="header">
        在 <span>{{ openMarkerData.title }}</span> 共发布了 <span>{{ openMarkerData.list.length }}</span> 条内容
        <el-icon class="close" @click="popup = false">
          <CloseBold />
        </el-icon>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in openMarkerData.contentList" :key="item._id.toString()">
          <comMomentItem :data="item">
          </comMomentItem>
        </div>
      </div>
      <LoadMore :loading="openMarkerData.loading"
        :has-more="openMarkerData.contentList.length < openMarkerData.list.length" @load-more="loadMore">
      </LoadMore>
    </div>
  </div>
</template>
<script setup>
import { CloseBold } from '@element-plus/icons-vue'
import comMomentItem from '../components/momentItem.vue'
import $http from "@/utils/http.js";
import { debounce } from "@/utils/util.js";
import { storeToRefs } from 'pinia'
import provinceJson from '~/public/100000_full.json'

const sysStore = useSysStore()
const route = useRoute()
const { theme, themeColor } = storeToRefs(sysStore)

const loading = ref(true)
const dataOfProvince = ref({})
const dataOfCity = ref({})
const dataOfDistrict = ref({})
const dataOfPoint = ref({})
const markerLevel = ref('')//marker纬度，province-city-district-point
const popup = ref(false)
const mapContainer = ref()
const openMarkerData = ref({
  loading: false,
  list: [],
  contentList: [],
  page: 1
})
const mapPosOfRegion = ref({
  province: {},
  city: {},
  district: {}
})
let mapInstance;
// 缩放程度对应数据纬度，最小5
// 5：省
// 6-10： 市
// >=11：point
watch(theme, v => {
  if (mapInstance) {
    mapInstance.setMapStyle(v == 'dark' ? "amap://styles/grey" : "amap://styles/whitesmoke")
  }
})
watch(popup, v => {
  if (v) {
    useRouter().push(route.fullPath + '#open')
  } else {
    if (route.fullPath.includes('open')) {
      useRouter().back()
    }
  }
})
watch(() => route.hash, v => {
  if (!v.includes('open')) {
    popup.value = false
  }
})
watch(markerLevel, async v => {
  loading.value = true
  mapInstance.clearMap()
  if (v == 'province') {
    mapPosOfRegion.value.province = findMapPosOfProvince(Object.keys(dataOfProvince.value))
    console.log(mapPosOfRegion.value.province)
    renderProvinceMarker()
  } else if (v == 'city') {
    await getDataOfCity(dataOfProvince.value).then(async (t) => {
      mapPosOfRegion.value.city = await findMapPosOfCity(Object.keys(t))
      renderCityMarker()
    })
  } else if (v == 'district') {
    await getDataOfDistrict(dataOfProvince.value).then(async () => {
      if (!Object.keys(dataOfCity.value).length) {
        await getDataOfCity(dataOfProvince.value)
      }
      mapPosOfRegion.value.district = await findMapPosOfDistrict(Object.keys(dataOfCity.value).reduce((obj, citycode) => {
        obj[citycode] = dataOfCity.value[citycode].map(item => item.location.detail.adcode)
        return obj
      }, {}))
      renderDistrictMarker()
    })
  } else {
    await getDataOfPoint(dataOfProvince.value).then(() => {
      renderPointMarker()
    })
  }
  loading.value = false
  // return true
})
onMounted(() => {
  initMap()
  getData().then(() => {
    loading.value = false
    markerLevel.value = 'province'
  })
})

function initMap() {
  mapInstance = new AMap.Map(mapContainer.value, {
    viewMode: "2D",
    mapStyle: theme.value == 'dark' ? "amap://styles/grey" : "amap://styles/whitesmoke",
    zoom: 5,
    center: [116.397428, 39.90923],
    // features: ["bg", 'building', 'road'],//'point',
  });
  mapInstance.on('zoomend', onZoomChange)
}

function onZoomChange(e) {
  let zoom = parseInt(e.target.getZoom())
  if (zoom <= 5) {
    markerLevel.value = 'province'
  } else if (zoom > 5 && zoom <= 9) {
    markerLevel.value = 'city'
  } else if (zoom == 10) {
    markerLevel.value = 'district'
  } else {
    markerLevel.value = 'point'
  }
}

//获取省份纬度数据
function getData() {
  return $http.get('/api/st/contentNumByProvince').then(res => {
    dataOfProvince.value = res.data
  })
}

//获取城市纬度数据
async function getDataOfCity(data) {
  if (Object.keys(dataOfCity.value).length > 0) {
    return dataOfCity.value
  }
  let t = {}
  for (const province in data) {
    for (const item of data[province]) {
      if (t[item.location.detail.citycode]) {
        t[item.location.detail.citycode].push(item)
      } else {
        t[item.location.detail.citycode] = [item]
      }
    }
  }
  dataOfCity.value = t
  return t
}

//获取区纬度数据
async function getDataOfDistrict(data) {
  if (Object.keys(dataOfDistrict.value).length > 0) {
    return
  }
  let t = {}
  for (const province in data) {
    for (const item of data[province]) {
      if (t[item.location.detail.adcode]) {
        t[item.location.detail.adcode].push(item)
      } else {
        t[item.location.detail.adcode] = [item]
      }
    }
  }
  dataOfDistrict.value = t
  return t
}
//获取点纬度数据
async function getDataOfPoint(data) {
  if (Object.keys(dataOfPoint.value).length > 0) {
    return
  }
  let t = {}
  for (const province in data) {
    for (const item of data[province]) {
      if (t[item.location.id]) {
        t[item.location.id].push(item)
      } else {
        t[item.location.id] = [item]
      }
    }
  }
  dataOfPoint.value = t
}

//查询省份的地图中心点
function findMapPosOfProvince(provinces = []) {
  let t = {}
  for (const province of provinces) {
    t[province] = provinceJson.features.find(item => item.properties.name == province)?.properties?.center
  }
  return t
}

//查询城市的地图中心点
function findMapPosOfCity(citys = []) {
  return $http.get(`/api/st/findRegionOfCity?codes=${citys.join(',')}`).then(res => {
    return res.data
  })
}

//查询区的地图中心点
async function findMapPosOfDistrict(data) {
  return $http.post(`/api/st/findRegionOfDistrict`, { data }).then(res => {
    return res.data
  })
}

//渲染省份纬度数据
function renderProvinceMarker() {
  for (const province in dataOfProvince.value) {
    let marker = makeMarker({
      pos: mapPosOfRegion.value.province[province],
      key: province,
      title: province,
      list: dataOfProvince.value[province]
    })
    mapInstance.add(marker);
  }
}
//渲染城市纬度数据
function renderCityMarker() {
  for (const citycode in dataOfCity.value) {
    let location = dataOfCity.value[citycode][0]?.location
    let marker = makeMarker({
      pos: mapPosOfRegion.value.city[citycode],
      key: citycode,
      title: location?.detail?.province + location?.detail?.city,
      list: dataOfCity.value[citycode],
      size: 30
    })
    mapInstance.add(marker);
  }
}
//渲染区纬度数据
function renderDistrictMarker() {
  for (const code in dataOfDistrict.value) {
    let location = dataOfDistrict.value[code][0]?.location
    let marker = makeMarker({
      pos: mapPosOfRegion.value.district[code],
      key: code,
      title: location?.detail?.province + location?.detail?.city + location?.detail?.district,
      list: dataOfDistrict.value[code],
      size: 30
    })
    mapInstance.add(marker);
  }
}
//渲染所有点数据
function renderPointMarker() {
  for (const id in dataOfPoint.value) {
    let point = dataOfPoint.value[id][0]
    let marker = makeMarker({
      pos: [point.location.location.lng, point.location.location.lat],
      key: id,
      title: point.location?.name,
      list: dataOfPoint.value[id],
      size: 10,
      showNum: false
    })
    mapInstance.add(marker);
  }
}

//创建地图点
function makeMarker({ pos = [], key = '', title = '', list = [], size = 40, showNum = true, opacity = 1 }) {
  const style = `
  background:${themeColor.value};
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  width:${size}px;
  height:${size}px;
  border-radius:50%;
  user-select: none;
  font-size:${size / 2}px;
  opacity:${opacity};
  border:2px solid #fff;
  box-shadow:0 0 2px 2px rgba(0,0,0,0.1);
  `
  let markerEl = `<div style="${style}">${showNum ? list.length : ''}</div>`
  let marker = new AMap.Marker({
    position: new AMap.LngLat(pos[0], pos[1]),
    content: markerEl,
    offset: new AMap.Pixel(-size / 4, -size / 1.2),
    topWhenClick: true,
    title,
    extData: { title, list, key },
  });
  if (sysStore.isMobile()) {
    marker.on('touchstart', debounce(markerClick))
  } else {
    marker.on('click', debounce(markerClick))
  }
  return marker
}

function markerClick(e) {
  popup.value = true
  let extData = e.target.getExtData()
  openMarkerData.value = {
    ...extData,
    page: 1,
    loading: false,
    contentList: []
  }
  let firstPoint
  if (markerLevel.value == 'province') {
    firstPoint = dataOfProvince.value[extData.key][0]
  } else if (markerLevel.value == 'city') {
    firstPoint = dataOfCity.value[extData.key][0]
  }
  else if (markerLevel.value == 'district') {
    firstPoint = dataOfDistrict.value[extData.key][0]
  }
  else if (markerLevel.value == 'point') {
    firstPoint = dataOfPoint.value[extData.key][0]
  }
  if (firstPoint) {
    mapInstance.setCenter(new AMap.LngLat(firstPoint.location.location.lng, firstPoint.location.location.lat))
  }
  getContentList()
  mapInstance.setZoom(12)
}

function loadMore() {
  if (openMarkerData.value.loading) return
  getContentList(openMarkerData.value.page + 1)
}
function getContentList(page = 1) {
  if (openMarkerData.value.loading) return
  openMarkerData.value.loading = true

  let ids = []
  for (let i = (page - 1) * 10; i < 10 * page; i++) {
    if (openMarkerData.value.list[i]) {
      ids.push(openMarkerData.value.list[i]?._id)
    }
  }
  $http.post('/api/articleById', { ids }).then(res => {
    res.data.forEach(element => {
      openMarkerData.value.contentList.push(element)
    });
    openMarkerData.value.page = page
  }).finally(() => {
    openMarkerData.value.loading = false
  })
}
</script>
<style lang="scss" scoped>
.footprint-map-page {
  height: 100%;
  overflow: hidden;
  padding: 15px;
  // padding-left: 0;
  box-sizing: border-box;

  .map-container {
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }

  .drawer-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .drawer {
    position: absolute;
    bottom: 30px;
    right: 30px;
    z-index: 999;
    width: 350px;
    height: calc(100% - 60px);
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.06);
    opacity: 0;
    pointer-events: none;
    transform: translateX(100%);
    transition: all .3s;
    padding: 15px;
    padding-top: 0;
    box-sizing: border-box;
    overflow: auto;

    &.show {
      transform: translateX(0);
      opacity: 1;
      pointer-events: all;
    }

    .close {
      position: absolute;
      z-index: 9;
      right: 15px;
      top: 15px;
      font-size: 30px;
      font-weight: bold;
      cursor: pointer;
      color: red;
    }

    .header {
      font-size: 15rpx;
      padding: 15px 0;
      padding-top: 20px;
      margin-bottom: 10px;
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 2;
      border-bottom: 1px solid #eee;

      span {
        font-weight: bold;
      }
    }

    .list {
      .item {
        padding-bottom: 30px;
        margin-bottom: 20px;
        border-bottom: 10px solid #f0f0f0;
      }
    }
  }
}

@media screen and (max-width:750px) {
  .footprint-map-page {
    padding: 0;

    .drawer {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 70vh;
      transform: translateY(100%);
      border-radius: 20px 20px 0 0;

      &.show {
        transform: translateY(0);
      }
    }
  }
}
</style>