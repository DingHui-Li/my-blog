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
  height: 100%;
  .cover {
    position: sticky;
    top: 0;
    width: 100%;
    border-radius: 20px 20px 0 0;
    overflow: hidden;
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
    top: $topbar-height;
    background: #fff;
    padding: 30px;
    border-radius: 20px 20px 0 0;
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
    padding: 30px;
    padding-top: 0;
    background: #fff;
    border-radius: 0 0 20px 20px;
    min-height: 500px;
    overflow: hidden;

    .content {
      // margin-top: 15px;
    }
  }
  &.has-cover {
    .title-box {
      transform: translateY(-20px);
      top: calc($topbar-height + 20px);
    }
    .container {
      transform: translateY(-20px);
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

@media screen and (max-width: 1080px) {
  .cover {
    border-radius: 0 !important;
    position: relative !important;
  }
  .title-box {
    padding: 15px !important;
    top: -20px !important;
  }
  .container {
    padding: 15px !important;
  }
}
</style>
