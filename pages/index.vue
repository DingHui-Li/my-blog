<template>
  <div class="home-page" @scroll="onScroll" ref="pageEl">
    <div class="cover" v-if="type == '' && website.cover">
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
          <div class="year">{{ new Date(item.createTime).getFullYear() }}</div>
          <div class="tag">那年今日</div>
          <comArticleItem v-if="item.type == 'article'" :data="item"></comArticleItem>
          <comMomentItem v-else :data="item"></comMomentItem>
        </div>
      </div>
      <div :class="['item type']" v-for="(item, index) in _list" :key="item._id.toString()"
        :style="`animation-delay:${index % 10 * 100}ms`">
        <comAlbumItem v-if="type == 'photo'" :data="item"
          :showYear="index == 0 || item.createTimeObj?.getFullYear() != _list[index - 1]?.createTimeObj?.getFullYear()"
          :showMonth="index == 0 || item.createTimeObj?.getFullYear() != _list[index - 1].createTimeObj?.getFullYear() || item.createTimeObj?.getMonth() != _list[index - 1].createTimeObj?.getMonth()">
        </comAlbumItem>
        <comArticleItem v-else-if="item.type == 'article'" :data="item"></comArticleItem>
        <comMomentItem v-else :data="item"></comMomentItem>
      </div>
      <LoadMore :loading="pagination.loading" :has-more="pagination.hasMore" @load-more="loadMore(searchFilter)">
      </LoadMore>
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
import { CircleCloseFilled } from '@element-plus/icons-vue'

const pageEl = ref<any>(null)
const { globalSetting } = storeToRefs(useSysStore())
const website = computed(() => globalSetting.value.website || {})
const profile = computed(() => globalSetting.value.profile || {})
const route = useRoute()
let type = ref('')
let date = ref<string>('')
let { pagination, list, getList, loadMore } = useList<Article>("/api/article");
const listOfSameDay = ref<Array<Article>>()


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
  scroll-behavior: smooth;
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

.date {
  font-size: 15px;
  padding: 0 30px;
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
  background: #fff;
  min-height: 100vh;
  padding-top: 10px;
  padding-bottom: 60px;

  .item {
    position: relative;
    padding: 30px 15px;
    padding-left: 30px;
    padding-bottom: 50px;
    opacity: 0;
    animation: fadeIn .3s forwards;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;

    &.photo {
      padding-bottom: 0;
      margin-bottom: 0;
      border: none;
    }

    &.same-day {
      .year {
        position: absolute;
        top: -20px;
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
        border-radius: 30px 0 0 30px;
        pointer-events: none;
        font-size: 15px;
      }
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
