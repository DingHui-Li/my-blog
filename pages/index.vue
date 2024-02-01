<template lang="pug">
.cover(v-if='website.cover')
  img(:src='website.cover')
.home
  .item(:class="type" v-for="(item,index) in list" :key='item._id' :style="`animation-delay:${index%10*100}ms`")
    comAlbumItem(v-if='type=="photo"' :data='item' 
      :showYear='index==0||item.year!=list[index-1].year',
      :showMonth='index==0||item.year!=list[index-1].year||item.month!=list[index-1].month')
    comMomentItem(v-else-if='item.type=="moment"' :data='item')
    comArticleItem(v-else :data='item')
  LoadMore(:loading="pagination.loading" :has-more="pagination.hasMore" @load-more="loadMore") 
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

const pagination = ref({
  loading: false,
  hasMore: false,
  page: 1,
  size: 10
})

watch(() => route.hash, v => {
  type.value = v?.replace('#', '')
  getArticleList()
}, { immediate: true })

function loadMore() {
  console.log('loadMore')
  getArticleList(pagination.value.page + 1)
}
function getArticleList(page = 1) {
  if (page == 1) {
    list.value = []
  }
  pagination.value.loading = true
  $http.get("/api/article",
    {
      type: type.value || "moment",
      page,
      size: pagination.value.size
    }).then(({ data: res }) => {
      if (type.value == 'photo') {
        res.list = res.list.filter(item => item.imgs.length > 0)
      }
      res.list = res?.list?.map((item, index) => {
        let date = new Date(item.createTime)
        item.year = date.getFullYear()
        item.month = date.getMonth() + 1
        return item
      })
      list.value = [...list.value, ...res?.list];
      pagination.value = {
        ...pagination.value,
        page,
        hasMore: res.page * res.size < res.total
      }
    }).finally(() => {
      pagination.value.loading = false
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
