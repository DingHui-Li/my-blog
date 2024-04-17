<template lang="pug">
.article
  .content
    comContent(v-if='detail.type=="article"' :data='detail')
    comPhotoAlbum(v-else :data='detail')
</template>

<script setup>
import comContent from "./components/content.vue";
import comPhotoAlbum from './components/photoAlbum.vue'
import $http from "@/utils/http.js";

const route = useRoute();
let detail = ref({});
getArticle();

function getArticle() {
  $http.get(`/api/article/${route.params.id}`).then((res) => {
    detail.value = res?.data;
  });
}
</script>
<style lang="scss" scoped>
.article {
  position: relative;
  overflow: auto;
}
</style>
