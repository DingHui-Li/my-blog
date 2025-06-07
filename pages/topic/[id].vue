<template lang="pug">
.topic(@scroll="onScroll" ref="pageEl")
  .cover
    img(v-if='topicDetail.cover' :src='topicDetail.cover')
    .imgs(v-else)
      img.img(v-for="item in coverImgs" :src="item" :style='coverImgStyle')
    .mask
    .name {{ topicDetail.name }}·{{ totalCount }}
  .container
    .content
      Content(@dataChange="onDataChange")
</template>
<script setup>
defineOptions({ name: 'topic' })
import Content from "./components/content.vue";
import $http from "@/utils/http.js";

const pageEl = ref(null)

const route = useRoute();
const totalCount = ref(0)
const coverImgs = ref([])
const coverImgStyle = computed(() => {
  let width = '100%'
  let height = '100%'
  if (coverImgs.value.length <= 5) {
    width = (1 / coverImgs.value.length) * 100 + '%'
    height = '100%'
  }
  else if (coverImgs.value.length <= 10) {
    width = (2 / coverImgs.value.length) * 100 + '%'
    height = '50%'
  } else if (coverImgs.value.length <= 20) {
    width = '20%'
    height = '50%'
  } else {
    width = '10%'
    height = '25%'
  }
  return `width:${width};height:${height}`
})
// if (!route.hash.includes('topic')) {
//   useRouter().replace(route.fullPath + '#topic')
// }
let topicDetail = ref({});
getTopic();

function getTopic() {
  $http.get(`/api/topic/${route.params.id}`).then((res) => {
    topicDetail.value = res.data;
  });
}

function onDataChange({ total, imgs }) {
  totalCount.value = total
  coverImgs.value = imgs.slice(0, 40)
}

onActivated(() => {
  pageEl.value?.scrollTo(0, sessionStorage['topic-page-scroll-top'])
})

function onScroll(e) {
  sessionStorage['topic-page-scroll-top'] = e.target.scrollTop
}
</script>
<style lang="scss" scoped>
.topic {
  position: relative;
  overflow: auto;
  // background-color: #fff;

  .cover {
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: 200px;

    img {
      width: 100%;
      height: auto;
    }

    .imgs {
      position: absolute;
      width: 100%;
      height: 100%;
      font-size: 0;

      .img {
        width: 50px;
        height: 100%;
        object-fit: cover;
      }
    }

    .mask {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5));
    }

    .name {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      padding: 30px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      color: #fff;
      box-sizing: border-box;
    }
  }

  .container {
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      width: 300px;
    }

    .content {
      overflow: hidden;
      padding-bottom: 15px;
      // margin-left: 315px;
    }
  }
}
</style>
