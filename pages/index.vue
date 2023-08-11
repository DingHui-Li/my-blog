<template lang="pug">
//- .cover
//-   img(:src='website?.cover')
.home
  div(v-for='page in list')
    .item(v-for="(item,index) in page" :key='item._id' :style="`animation-delay:${index*100}ms`")
      comMomentItem(v-if='item.type=="moment"' :data='item')
      comAlbumItem(v-else-if='item.type=="photo"' :data='item')
      comArticleItem(v-else :data='item')
</template>
<script setup>
import $http from "@/utils/http.js";
import comArticleItem from './components/articleItem'
import comMomentItem from './components/momentItem'
import comAlbumItem from './components/albumItem'

const sys = useSysStore()
let website = sys.globalSetting.website
const route = useRoute()
let type = ref('')
let list = ref([]);
getArticleList();
watch(route, v => {
  if (v.name == 'index') {
    type.value = v.hash?.replace('#', '')
    getArticleList()
  }
})

function getArticleList(page = 1) {
  if (page == 1) {
    list.value = []
  }
  $http.get("/api/article", { type: type.value, page }).then((res) => {
    list.value[page] = res?.data?.list;
  });
}
</script>
<style lang="scss" scoped>
.cover {
  width: 100%;
  height: auto;
}

.home {
  position: relative;
  top: -5px;
  background: #fff;
  padding: 15px;
  padding-left: 30px;
  min-height: 100vh;

  .item {
    opacity: 0;
    animation: fadeIn .3s forwards;
  }
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}
</style>
