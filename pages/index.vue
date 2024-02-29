<template>
  <div class="cover" v-if="website.cover"><img :src="website.cover" /></div>
  <div class="home">
    <div class="item" :class="type" v-for="(item, index) in list" :key="item._id.toString()"
      :style="`animation-delay:${index % 10 * 100}ms`">
      <comAlbumItem v-if="type == 'photo'" :data="item"
        :showYear="index == 0 || item.createTimeObj?.getFullYear() != list[index - 1]?.createTimeObj?.getFullYear()"
        :showMonth="index == 0 || item.createTimeObj?.getFullYear() != list[index - 1].createTimeObj?.getFullYear() || item.createTimeObj?.getMonth() != list[index - 1].createTimeObj?.getMonth()">
      </comAlbumItem>
      <comMomentItem v-else-if="item.type == 'moment'" :data="item"></comMomentItem>
      <comArticleItem v-else :data="item"></comArticleItem>
    </div>
    <LoadMore :loading="pagination.loading" :has-more="pagination.hasMore" @load-more="loadMore"> </LoadMore>
  </div>
</template>
<script setup lang="ts">
import $http from "@/utils/http.js";
import comArticleItem from './components/articleItem.vue'
import comMomentItem from './components/momentItem.vue'
import comAlbumItem from './components/albumItem.vue'
import { Article } from "~/types";

const sys = useSysStore()
let website = sys.globalSetting.website
const route = useRoute()
let type = ref(route.hash?.replace('#', ''))
let list = ref<Array<Article>>([]);

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
      let t: Array<Article> = res.list
      if (type.value == 'photo') {
        t = t.filter(item => item.imgs.length > 0)
      }
      t = t?.map((item, index) => {
        item.createTimeObj = new Date(Number(item.createTime))
        return item
      })
      list.value = [...list.value, ...t];
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
