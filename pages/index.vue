<template lang="pug">
.home
  //- .cover  hello,
  //- img(:src='')
  comArticleItem(v-for="item in list" :data='item' )
</template>
<script setup>
import $http from "@/utils/http.js";
import TopicList from "./components/topicList.vue";
import RecentList from "./components/recent.vue";
import comArticleItem from './components/articleItem'

let topics = ref([]);
let list = ref([]);
let type = ref('')
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
  background: #f9f9f9;
  padding: 15px;
  min-height: 100vh;
}
</style>
