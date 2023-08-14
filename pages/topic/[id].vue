<template lang="pug">
.topic
  .cover
    img(:src='topicDetail.cover')
    .mask
    .name {{ topicDetail.name }}
  .container
    .content
      Content
</template>
<script setup>
import Content from "./components/content.vue";
import LeftSide from "./components/leftSide.vue";
import $http from "@/utils/http.js";

const route = useRoute();
let topicDetail = ref({});
getTopic();

function getTopic() {
  $http.get(`/api/topic/${route.params.id}`).then((res) => {
    topicDetail.value = res.data;
  });
}
</script>
<style lang="scss" scoped>
.topic {
  // display: flex;
  position: relative;

  .cover {
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: 200px;

    img {
      width: 100%;
      height: auto;
    }

    .mask {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
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
