<template>
  <div class="home-page" @scroll="onScroll" ref="pageEl">
    <!-- <div class="cover" v-if="type == '' && website.cover">
      <div class="img-box">
        <img :src="website.cover" />
      </div>
      <div class="profile" @click="router.push('/other/userPortrait')">
        <div class="name">
          {{ profile.name }}
          <div class="bubble" v-if="analyMyBlog.hasUpdate">AI</div>
        </div>
        <div class="avatar">
          <img :src="profile.avatar" alt="">
        </div>
      </div>
    </div> -->
    <comPublishCount v-if="type != 'photo'" :type='type' @choosedDate="onChoosedDate" />
    <div class="date" v-if="date">
      已筛选 {{ new Date(date).format('yyyy年M月d日') }} 的内容
      <el-icon class="icon" @click="onChoosedDate('')">
        <CircleCloseFilled />
      </el-icon>
    </div>
    <div class="home">
      <div v-if="!date">
        <div class="item same-day" v-for="item in listOfSameDay" :key="item._id.toString()">
          <!-- <div class="year">{{ new Date(item.createTime).getFullYear() }}</div> -->
          <div class="tag">{{ new Date().getFullYear() - new Date(item.createTime).getFullYear() }} 年前的今天</div>
          <comArticleItem v-if="item.type == 'article'" :data="item"></comArticleItem>
          <comMomentItem v-else :data="item"></comMomentItem>
        </div>
      </div>
      <div :class="['item type']" v-for="(item, index) in _list" :key="item._id.toString()"
        :style="`animation-delay:${index % 10 * 100}ms`">
        <comAlbumItem v-if="type == 'photo'" :data="item"></comAlbumItem>
        <comArticleItem v-else-if="item.type == 'article'" :data="item"></comArticleItem>
        <comMomentItem v-else :data="item"></comMomentItem>
      </div>
      <LoadMore :loading="pagination.loading" :has-more="pagination.hasMore" @load-more="loadMore(searchFilter)">
      </LoadMore>
    </div>
    <div class="toTop" @click="handleToTop" v-if="scrollTop > 500">
      <el-icon class="icon">
        <CaretTop />
      </el-icon>
      {{ scrollTop > 1000 ? ((scrollTop / 1000).toFixed(1) + 'k') : scrollTop.toFixed(0) }}
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'index' })
import $http from "@/utils/http.js";
import { storeToRefs } from 'pinia'
import comArticleItem from './components/articleItem.vue'
import comMomentItem from './components/momentItem.vue'
import comAlbumItem from './components/albumItem.vue'
import comPublishCount from './components/publishCount.vue'
import { type Article } from "~/types";
import useList from '~/hooks/useList';
import { CircleCloseFilled, CaretTop } from '@element-plus/icons-vue'

const pageEl = ref<any>(null)
const { globalSetting, analyMyBlog } = storeToRefs(useSysStore())
const website = computed(() => globalSetting.value.website || {})
const profile = computed(() => globalSetting.value.profile || {})
const route = useRoute()
const router = useRouter();
let type = ref('')
let date = ref<string>('')
let { pagination, list, getList, loadMore } = useList<Article>("/api/article");
const listOfSameDay = ref<Array<Article>>()
const scrollTop = ref(0)


const searchFilter = computed(() => {
  return { type: type.value || "moment", date: date.value }
})
watch(() => route.hash, (hash: any) => {
  date.value = ''
  type.value = hash?.replace('#', '')
  initList()
}, {
  immediate: true
})

onActivated(() => {
  pageEl.value?.scrollTo(0, sessionStorage['home-page-scroll-top'])
})

const _list = computed(() => {
  return list.value.map((item: Article) => {
    item.createTimeObj = new Date(Number(item.createTime))
    return item
  })
})

function initList() {
  list.value = []
  pagination.value.page = 1
  if (process.client) {
    sessionStorage['home-page-scroll-top'] = 0
    pageEl.value?.scrollTo(0, 0)
  }
  getList(searchFilter.value);
  if (!type.value || type.value == 'moment') {
    getListOfSameDay()
  } else {
    listOfSameDay.value = []
  }
}

function onScroll(e: any) {
  sessionStorage['home-page-scroll-top'] = e.target.scrollTop
  scrollTop.value = e.target.scrollTop
}

function handleToTop() {
  pageEl.value?.scrollTo(0, 0)
}

function onChoosedDate(e: string) {
  date.value = e;
  initList()
}

function getListOfSameDay() {
  $http.get('/api/article/sameday').then(res => {
    listOfSameDay.value = res.data
  })
}
</script>
<style lang="scss" scoped>
.home-page {
  height: 100%;
  overflow: auto;
  // scroll-behavior: smooth;
}

.cover {
  // position: sticky;
  position: relative;
  top: 0;
  z-index: 2;
  width: 100%;
  height: fit-content;
  margin-bottom: 20px;

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
    max-height: 40vh;

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
    cursor: pointer;

    .name {
      position: relative;
      padding-top: 4px;
      width: fit-content;
      font-size: 22px;
      font-weight: bold;
      color: #fff;
      margin-right: 15px;
      text-decoration: underline;
    }

    .avatar {
      position: relative;
      width: 60px;
      height: 60px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px;
      }
    }

    .bubble {
      position: absolute;
      top: -5px;
      right: -10px;
      z-index: 2;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: red;
      color: #fff;
      border-radius: 50%;
      font-size: 12px;
      box-shadow: 0 0 5px 5px rgba(255, 0, 0, .2);
    }
  }
}

.date {
  margin-top: 10px;
  font-size: 15px;
  padding-left: 15px;
  color: var(--primary-color);
  font-weight: bold;
  display: flex;
  align-items: center;

  .icon {
    color: #D32F2F;
    font-size: 18px;
    margin-left: 10px;
    cursor: pointer;
  }
}

.home {
  position: relative;
  // top: -5px;
  // background: #fff;
  min-height: 100vh;
  padding: 15px;
  padding-top: 10px;
  padding-bottom: 60px;

  .item {
    position: relative;
    padding: 15px;
    opacity: 0;
    animation: fadeIn .3s forwards;
    // border-bottom: 10px solid #f0f0f0;
    background-color: rgba(255, 255, 255, 1);
    // backdrop-filter: blur(10px);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;

    &.photo {
      padding-bottom: 0;
      margin-bottom: 0;
      border: none;
    }

    &.same-day {
      .year {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 100px;
        line-height: 100px;
        color: #000;
        opacity: 0.04;
        font-weight: bold;
        pointer-events: none;
      }

      .tag {
        position: absolute;
        top: 0;
        right: 0;
        background-color: var(--primary-color);
        color: #fff;
        padding: 8px 10px;
        padding-left: 15px;
        border-radius: 0 0 0 10px;
        pointer-events: none;
        font-size: 15px;
        box-shadow: 0 0 20px 0px var(--primary-color);
      }
    }
  }
}

.toTop {
  position: fixed;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  bottom: 30px;
  right: 30px;
  background-color: var(--primary-color);
  border-radius: 50%;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    transform: scale(1.4);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--primary-color);
    opacity: 0.5;
  }

  .icon {
    font-size: 20px;
    color: #fff;
    line-height: 15px;
  }
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}

@media screen and (max-width:1080px) {
  .home {
    padding: 10px;

    .item {
      padding-left: 15px;
      margin-bottom: 10px;
    }
  }
}
</style>
