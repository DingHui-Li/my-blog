<template lang="pug">
.article
  .content
    Content(:data='detail')
  .right
    RightSide(:topics='detail.topics'  :aid='detail._id')
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
  margin-top: 30px;
  .content {
    margin-right: calc(300px + 15px);
  }
  .right {
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    width: 300px;
  }
}
@media screen and (max-width: 1080px) {
  .article {
    margin-top: 0;
    .content {
      margin-right: 0;
    }
    .right {
      position: relative;
      width: 100%;
      margin-bottom: 30px;
    }
  }
}
</style>
