<template lang="pug">
.cover(v-if='website?.cover')
  img(:src='website.cover')
.home
  .item(:class="type" v-for="(item,index) in list" :key='item._id' :style="`animation-delay:${index%10*100}ms`")
    comAlbumItem(v-if='type=="photo"' :data='item' 
      :showYear='index==0||item.updateYear!=list[index-1].updateYear',
      :showMonth='index==0||item.updateYear!=list[index-1].updateYear||item.updateMonth!=list[index-1].updateMonth')
    comMomentItem(v-else-if='item.type=="moment"' :data='item')
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
let type = ref(route.hash?.replace('#', ''))
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
  $http.get("/api/article", { type: type.value || "moment", page }).then((res) => {
    res?.data?.list?.map((item, index) => {
      let date = new Date(item.updateTime)
      item.updateYear = date.getFullYear()
      item.updateMonth = date.getMonth() + 1
      return item
    })
    list.value = [...list.value, ...res?.data?.list];
  });
}
</script>
<style lang="scss" scoped>
.cover {
  width: 100%;
  height: auto;
  transform: scale(1.1);

  img {
    width: 100%;
    height: auto;
  }
}

.home {
  position: relative;
  // top: -5px;
  background: #fff;
  min-height: 100vh;
  padding-top: 15px;
  padding-bottom: 60px;

  .item {
    padding: 15px;
    padding-left: 30px;
    opacity: 0;
    animation: fadeIn .3s forwards;
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;

    &.photo {
      padding-bottom: 0;
      margin-bottom: 0;
      border: none;
    }
  }
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}

@media screen and (max-width:1080px) {
  .home {
    .item {
      padding-left: 15px;
    }
  }
}
</style>
