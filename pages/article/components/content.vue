<template lang="pug">
.content-container(:class="data.cover&&'has-cover'")
  .cover(v-if='data.cover')
    img(:src='data.cover')
  .title-box
    .subtitle
      TopicTag(v-for="topic in data.topics" :data='topic')
      .date(style="margin-right:30px") 发布于{{ moment(data.createTime).calendar() }}
      .date(v-if="data.createTime!=data.updateTime") {{moment(data.updateTime).fromNow()}}更新
    .title {{data.title}}
  .container(:class="data.cover&&'has-cover'")
    .content(v-html='data.htmlContent')
.img-preview(v-if='previewImg.show' @click="previewImg.show=false")
  img(:src='previewImg.url')
</template>
<script setup>
import moment from "moment";
import TopicTag from "~/pages/components/topicTag.vue";

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
      previewImg.value = {
        show: true,
        url: e.target.currentSrc,
      };
    });
  }
}
</script>
<style lang="scss" scoped>
$topbar-height: 50px;

.content-container {
  background: #fff;
  height: 100%;

  .cover {
    width: 100%;
    overflow: hidden;
    max-height: 60vh;
    height: auto;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .title-box {
    position: sticky;
    z-index: 9;
    top: -60px;
    padding: 15px;
    padding-bottom: 5px;
    border-radius: 20px 20px 0 0;
    background-color: #fff;

    .subtitle {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .date {
        font-size: 12px;
        color: #999;
      }
    }

    .title {
      position: sticky;
      top: 0;
      font-size: 25px;
      font-weight: bold;
    }
  }

  .container {
    position: relative;
    z-index: 1;
    // padding-top: 0;
    background: #fff;
    min-height: 500px;
    overflow: hidden;

    .content {
      // margin-top: 15px;
      padding: 0 15px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
