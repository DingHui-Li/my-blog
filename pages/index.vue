<template>
  <div style="overflow: auto;">
    <div class="cover" v-if="website.cover">
      <div class="img-box">
        <img :src="website.cover" />
      </div>
      <div class="profile">
        <div class="name">{{ profile.name }}</div>
        <div class="avatar">
          <img :src="profile.avatar" alt="">
        </div>
      </div>
    </div>
    <div class="home">
      <div class="item" :class="type" v-for="(item, index) in list" :key="item._id.toString()"
        :style="`animation-delay:${index % 10 * 100}ms`">
        <comAlbumItem v-if="type == 'photo'" :data="item"
          :showYear="index == 0 || item.createTimeObj?.getFullYear() != list[index - 1]?.createTimeObj?.getFullYear()"
          :showMonth="index == 0 || item.createTimeObj?.getFullYear() != list[index - 1].createTimeObj?.getFullYear() || item.createTimeObj?.getMonth() != list[index - 1].createTimeObj?.getMonth()">
        </comAlbumItem>
        <comArticleItem v-else-if="item.type == 'article'" :data="item"></comArticleItem>
        <comMomentItem v-else :data="item"></comMomentItem>
      </div>
      <LoadMore :loading="pagination.loading" :has-more="pagination.hasMore" @load-more="loadMore"> </LoadMore>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import $http from "@/utils/http.js";
import comArticleItem from './components/articleItem.vue'
import comMomentItem from './components/momentItem.vue'
import comAlbumItem from './components/albumItem.vue'
import { Article } from "~/types";
import { Console } from 'console';

const { globalSetting } = storeToRefs(useSysStore())
const website = computed(() => globalSetting.value.website || {})
const profile = computed(() => globalSetting.value.profile || {})
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
    if (process.client) {
      window.scrollTo(0, 0)
    }
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
  position: relative;
  z-index: 9;
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;

  &::before {
    content: '';
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(to top, rgba(0, 0, 0, .2), transparent);
  }

  .img-box {
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.1);
    }
  }

  .profile {
    position: absolute;
    z-index: 3;
    overflow: hidden;
    width: 100%;
    bottom: -20px;
    display: flex;
    justify-content: flex-end;
    padding: 15px;
    padding-bottom: 0;
    box-sizing: border-box;

    .name {
      padding-top: 4px;
      width: fit-content;
      font-size: 22px;
      font-weight: bold;
      color: #fff;
      margin-right: 15px;
    }

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.home {
  position: relative;
  // top: -5px;
  background: #fff;
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 60px;

  .item {
    padding: 15px;
    padding-left: 30px;
    opacity: 0;
    animation: fadeIn .3s forwards;
    padding-bottom: 30px;
    margin-bottom: 20px;
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
