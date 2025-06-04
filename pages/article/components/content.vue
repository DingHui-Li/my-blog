<template lang="pug">
.content-container(:class="data.cover&&'has-cover'")
  .cover(v-if='data.cover')
    img(:src='data.cover')
  .title-box
    .subtitle
      TopicTag(v-for="topic in data.topics" :data='topic')
      .date(style="margin-right:30px") 发布于{{ moment(data.createTime).calendar() }}
      .date(v-if="data.createTime!=data.updateTime") {{moment(data.updateTime).fromNow()}}更新
    h1.title {{data.title}}
  .container(:class="data.cover&&'has-cover'")
    //- .content(v-html='data.htmlContent')
    div(style="padding:15px" v-if='data.htmlContent')
      RichEditor(:value="data.htmlContent" readonly)
.img-preview(v-if='previewImg.show' @click="previewImg.show=false")
  img(:src='previewImg.url')
VImg(ref="VImgEl" style="display:none")
</template>
<script setup>
import moment from "moment";
import TopicTag from "~/pages/components/topicTag.vue";
import VImg from '@/components/vimg/index.vue'


const VImgEl = ref()
let previewImg = ref({
  show: false,
  url: "",
});

onMounted(() => {
  setTimeout(() => {
    addContentImgEvent();
  }, 1000);
});

const props = defineProps({
  data: Object,
});

function addContentImgEvent() {
  let imgs = document.getElementsByClassName("content-img");
  for (let index = 0; index < imgs.length; index++) {
    let img = imgs[index];
    img.addEventListener("click", (e) => {
      // previewImg.value = {
      //   show: true,
      //   url: e.target.currentSrc,
      // };
      VImgEl.value.open({ imgs: [e.target.currentSrc] }, e.target)
    });
  }
}
</script>
<style lang="scss" scoped>
$topbar-height: 50px;

.content-container {
  background: #fff;
  height: 100%;
  min-height: 100vh;

  .cover {
    width: 100%;
    overflow: hidden;
    height: auto;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .title-box {
    // position: sticky;
    z-index: 9;
    top: 0;
    padding: 15px;
    padding-bottom: 5px;
    border-radius: 20px 20px 0 0;
    background-color: #fff;
    font-size: 20px;

    .subtitle {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      flex-wrap: wrap;

      .date {
        font-size: 12px;
        color: #999;
      }
    }

    .title {
      position: sticky;
      top: 0;
      // font-size: 25px;
      font-weight: bold;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 15px;
    }
  }

  .container {
    position: relative;
    z-index: 1;
    // padding-top: 0;
    background: #fff;
    min-height: 500px;
    overflow: hidden;
    padding-bottom: 100px;

    .content {
      padding: 0 15px;
      line-height: 1.4;
      color: #333;

      // line-height: 22px;
      &:deep(p) {
        margin: 1rem 0;
      }

      &:deep(.code-block) {
        line-height: 12px !important;
        white-space: pre-wrap;
      }

      &:deep(.content-img) {
        height: auto;
      }
    }
  }
}

.img-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  padding: 50px;

  img {
    width: 70%;
    height: auto;
  }
}
</style>
