<template>
  <div class="v-img-com" ref="vimgEl">
    <img class="thumb-img" :src="thumb || src" :origin-src='src' @click="openCarousel">
    <teleport to="body" v-if="showCarousel">
      <div class="mask" ref="vimgCarouselBgEl"></div>
      <div v-show="showUI">
        <div class="pagination">
          <span>{{ currentIndex + 1 }}</span>/{{ imgList.length }}
        </div>
        <div v-if="currentIndex != 0" class="pagination-btn prev" @click="carouselController.prev()">
          <slot name="prev"></slot>
          <div class="prev-btn-default" v-if="!slots.prev"> 《 </div>
        </div>
        <div v-if="currentIndex < imgList.length - 1" class="pagination-btn next" @click="carouselController.next()">
          <slot name="next"></slot>
          <div class="next-btn-default" v-if="!slots.next"> 》 </div>
        </div>
      </div>
      <div class="v-img-carousel" ref="vimgCarouselEl" @mousedown="mouseStart" @touchstart="mouseStart"
        @mousemove="mouseMove" @touchmove="mouseMove" @mouseup="mouseEnd" @touchend="mouseEnd" @mouseover="mousecancel"
        @touchcancel="mousecancel">
        <comImgItem v-for="(item, index) in imgList" :index="index" :total="imgList.length"
          :carouselController="carouselController" :src="item.src" :thumb="item.thumb" :showUI="showUI">
        </comImgItem>
      </div>
    </teleport>
  </div>
</template>
<script setup lang="ts">
import { useSlots, getCurrentInstance } from 'vue'
import useCarousel from './useCarousel.ts'
import comImgItem from './components/imgItem.vue'
import anime from '@/utils/anime.es.js'

const slots = useSlots()
const {
  controller: carouselController,
  vimgCarouselEl, vimgCarouselBgEl,
  showCarousel, currentIndex,
  mouseStart,
  mouseMove,
  mouseEnd,
  mousecancel,
} = useCarousel()
const props = withDefaults(defineProps<{ src: string, thumb?: string, duration?: number }>(), { duration: 400 })

carouselController.afterOpen = afterCarouselOpen
carouselController.beforeClose = beforeCarouselClose

const vimgEl = ref()
const imgList = ref<Array<{ src: string, thumb?: string, rect: DOMRect, el?: Element }>>([])
const showUI = ref(true)

defineExpose({ open })

function open({ imgs = [], index = 0 }, target?: Element) {
  imgList.value = imgs.map(img => ({
    src: img,
    rect: target?.getBoundingClientRect() || new DOMRect(),
    el: target
  }))
  carouselController.open()
}

function openCarousel() {
  findImgList()
  carouselController.open()
}

function afterCarouselOpen() {
  return new Promise<any>((resolve) => {
    showUI.value = true
    imgList.value.forEach((item) => {
      anime({
        targets: item.el,
        opacity: 0,
        duration: 100
      })
    })
    const imgItemEls = vimgCarouselEl.value.querySelectorAll('.v-img-carousel-item')
    const imgEl = imgItemEls[currentIndex.value].querySelector('.img-box')
    if (imgEl) {
      const from: DOMRect = imgList.value[currentIndex.value].rect
      const to: DOMRect = imgEl.getBoundingClientRect()
      const animation: any = anime({
        targets: imgEl,
        top: [from.top / document.body.clientHeight * 100, '50%'],
        left: [from.left / document.body.clientWidth * 100, '50%'],
        width: [from.width, to.width],
        height: [from.height, to.height],
        translateX: [0, '-50%'],
        translateY: [0, '-50%'],
        easing: "easeInOutSine",
        duration: props.duration,
      })
      animation.finished.then(() => {
        resolve(true)
      })
    } else {
      resolve(true)
    }
  })
}
function beforeCarouselClose() {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      imgList.value.forEach((item) => {
        anime({
          targets: item.el,
          opacity: 1,
          duration: 100
        })
      })
    }, Math.max(0, props.duration));
    showUI.value = false
    const carouselRect = vimgCarouselEl.value.getBoundingClientRect()
    const carouselItemWidth = carouselRect.width / imgList.value.length
    const imgItemEls = vimgCarouselEl.value.querySelectorAll('.v-img-carousel-item')
    imgItemEls.forEach((el: Element, index: number) => {
      // const index = currentIndex.value
      const imgEl = imgItemEls[index].querySelector('.img-box')
      if (imgEl) {
        const from: DOMRect = imgEl.getBoundingClientRect()
        const to: DOMRect = imgList.value[index].rect
        anime({
          targets: vimgCarouselBgEl.value,
          opacity: 0,
          easing: "linear",
          duration: 100
        })
        const animation: any = anime({
          targets: imgEl,
          top: [(carouselRect.height * 0.5) + 'px', (to.top - carouselRect.top) + 'px'],
          left: [(carouselItemWidth * 0.5) + 'px', (to.left - carouselRect.left - carouselItemWidth * index) + 'px'],
          width: [from.width, to.width],
          height: [from.height, to.height],
          translateX: ['-50%', 0],
          translateY: ['-50%', 0],
          easing: "easeOutSine",
          duration: props.duration,
        })
        animation.finished.then(() => {
          setTimeout(() => {
            resolve(true)
          }, 100);
        })
      } else {
        resolve(true)
      }
    })
  })
}
//查找所有同级图片列表
function findImgList() {
  let list: Array<{ src: string, thumb: string, rect: DOMRect, el: Element }> = []
  vimgEl.value.parentNode?.querySelectorAll('.v-img-com').forEach((node: Element) => {
    list.push({
      el: node,
      rect: node.getBoundingClientRect(),
      src: node.children[0]?.getAttribute('origin-src') || '',
      thumb: node.children[0]?.getAttribute('src') || ''
    })
  })

  imgList.value = list
  currentIndex.value = list.findIndex(item => item.src == props.src)
  carouselController.length = list.length
}
</script>
<style lang="scss" scoped>
.v-img-com {
  position: relative;
  font-size: 0;

  .thumb-img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.mask {
  position: fixed;
  z-index: 9998;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: black;
}

.pagination {
  position: absolute;
  top: 15px;
  left: 15px;
  color: #fff;
  z-index: 9999+1;
  font-size: 16px;

  span {
    font-size: 24px;
  }
}

.v-img-carousel {
  position: fixed;
  z-index: 9999;
  width: auto;
  height: 100vh;
  top: 0;
  left: 0;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  overflow: visible;
}


.pagination-btn {
  position: absolute;
  top: 0;
  z-index: 9999+1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  outline: none;

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }

  .prev-btn-default,
  .next-btn-default {
    margin: 10px;
  }
}
</style>