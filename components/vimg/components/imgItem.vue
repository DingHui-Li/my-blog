<template>
  <div class="v-img-carousel-item" ref="imgItemEl">
    <div class="img-box" @click.stop="imgClick" ref="imgBoxEl" @mousedown="mouseStart" @touchstart="mouseStart"
      @mousemove="mouseMove" @touchmove="mouseMove" @mouseup="mouseEnd" @touchend="mouseEnd" @mouseover="mousecancel"
      @touchcancel="mousecancel">
      <img class="img thumb" :src="thumb" draggable="false">
      <img v-if="showOriginalImg || !thumb" class="img origin" :src="src" draggable="false">
      <div class="original-btn" v-show="showUI && scale == 1" v-if="thumb && !showOriginalImg"
        @click.stop="showOriginalImg = true">
        查看原图
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ src: string, thumb: string, index: number, total: number, carouselController: any, showUI: boolean }>()

const imgItemEl = ref()
const imgBoxEl = ref()
const showOriginalImg = ref(false)//显示原图
const scale = ref(1)
let clickCount = 0
let timer: any;

const clickPoint = ref<{
  active: boolean,
  start: { x: number, y: number },
  end: { x: number, y: number },
}>({
  active: false,
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0 },
})

watch(scale, (v) => {
  if (v == 1) {
    props.carouselController.stopSlide = false
  } else {
    props.carouselController.stopSlide = true
  }
})

function mouseStart(e: any) {
  let pos = getPointPos(e)
  clickPoint.value = {
    active: true,
    start: pos,
    end: pos,
  }
}
function mouseMove(e: any) {
  if (scale.value == 1) {
    return
  }
  if (!clickPoint.value.active) {
    return
  }

  let pos = getPointPos(e)
  const difX = (clickPoint.value.end.x - pos.x)
  const difY = (clickPoint.value.end.y - pos.y)
  clickPoint.value.end = pos
  if (imgItemEl.value) {
    //移动图片容器
    let top = Number(imgItemEl.value.style.top.replace('px', ''))
    let left = Number(imgItemEl.value.style.left.replace('px', ''))
    imgItemEl.value.style.transition = "none";
    let newTop = top - difY
    let newLeft = left - difX
    imgItemEl.value.style.top = newTop + 'px'
    imgItemEl.value.style.left = newLeft + 'px'
  }
}
function mouseEnd() {
  clickPoint.value.active = false
}

function mousecancel() {
  if (clickPoint.value.active) {
    clickPoint.value.active = false
    mouseEnd()
  }
}

function getPointPos(e: any) {
  let x = e.clientX
  let y = e.clientY
  if (e.type.includes('touch')) {
    x = e.touches[0]?.clientX || 0
    y = e.touches[0]?.clientY || 0
  }
  return { x, y }
}

function imgClick(e: any) {
  clickCount++;
  if (clickCount == 1) {
    timer = setTimeout(() => {
      clickCount = 0;
      // props.carouselController.close()
    }, 200);
  } else if (clickCount == 2) {
    clearTimeout(timer);
    clickCount = 0;
    dblclick(e)
  }
}

function dblclick(e: any) {
  const pos = getPointPos(e)
  scale.value = scale.value == 1 ? 1.5 : 1
  imgBoxEl.value.style.transition = "all .3s";
  imgBoxEl.value.style.transform = `translateX(-50%) translateY(-50%) scale(${scale.value})`;
  imgBoxEl.value.style.transformOrigin = `${pos.x}px ${pos.y}px`;
  setTimeout(() => {
    imgBoxEl.value.style.transition = "none";
  }, 300);
  if (scale.value == 1) {
    //复原图片容器位置
    imgItemEl.value.style.top = 0
    imgItemEl.value.style.left = 0
    imgItemEl.value.style.transition = "all .3s";
  }
}
</script>
<style lang="scss" scoped>
.v-img-carousel-item {
  display: inline-block;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: visible;
  user-select: none;
  transition: all .3s;


  .img-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
    max-width: 900px;
    font-size: 0;
    overflow: hidden;

    .img {
      position: relative;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;

      &.origin {
        position: absolute;
      }

      &.thumb {}
    }

    .original-btn {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      padding: 5px 10px;
      background-color: rgba(255, 255, 255, 0.2);
      border: 1px solid #fff;
      border-radius: 4px;
      font-size: 12px;
      color: #fff;

      &:active {
        opacity: 0.5;
      }
    }
  }
}
</style>