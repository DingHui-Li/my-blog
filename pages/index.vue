<template lang="pug">
.home
  .cover  hello,
    //- img(:src='')
  .divider
  TopicList(:topics='topics')
  .divider
  RecentList(:list='list')
</template>
<script setup>
import $http from "@/utils/http.js";
import TopicList from "./components/topicList.vue";
import RecentList from "./components/recent.vue";

let topics = ref([]);
let list = ref([]);
getArticleList();
getTopicList();

function getTopicList() {
  $http.get("/api/topic").then((res) => {
    topics.value = res?.data;
  });
}

function getArticleList() {
  $http.get("/api/article").then((res) => {
    list.value = res?.data?.list;
  });
}
</script>
<style lang="scss" scoped>
.home {
  background: #fff;
  .cover {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;

    img {
      width: 100%;
      height: auto;
    }
  }
  .divider {
    // margin: 20px 0;
    width: 100%;
    height: 1px;
    background: #eee;
  }
}
</style>
