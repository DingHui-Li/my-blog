<template lang="pug">
.home
  div(v-for="item in list")
    comMomentItem(v-if='item.type=="moment"' :data='item')
    comAlbumItem(v-else-if='item.type=="photo"' :data='item')
    comArticleItem(v-else :data='item')
</template>
<script setup>
import $http from "@/utils/http.js";
import comArticleItem from './components/articleItem'
import comMomentItem from './components/momentItem'
import comAlbumItem from './components/albumItem'

let list = ref([]);
getArticleList();

function getArticleList() {
  $http.get("/api/article",).then((res) => {
    list.value = res?.data?.list;
  });
}
</script>
<style lang="scss" scoped>
.home {
  background: #fff;
  padding: 15px;
  padding-left: 30px;
  min-height: 100vh;
}
</style>
