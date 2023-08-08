<template lang="pug">
.article
  .content
    Content(:data='detail')
</template>

<script setup>
import Content from "./components/content.vue";
import RightSide from "./components/rightSide.vue";
import $http from "@/utils/http.js";

const route = useRoute();
let detail = ref({});
getArticle();

function getArticle() {
  $http.get(`/api/article/${route.params.id}`).then((res) => {
    res.data.htmlContent = res.data?.htmlContent?.replaceAll(
      "<img",
      '<img class="content-img" style="max-width:100%;cursor:zoom-in"'
    );
    detail.value = res?.data;
  });
}
</script>
<style lang="scss" scoped>
.article {
  position: relative;
  background: #f9f9f9;
}
</style>
