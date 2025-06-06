<template>
  <div class="statist" @scroll="onScroll" ref="pageEl">
    <div class="rank-list">
      <div class="list">
        <div class="title">最人间值得</div>
        <div :class="['item']" v-for="(item, index) in top10List" :key="item._id.toString()">
          <div class="emoji">{{ item.mood.emoji }}</div>
          <div class="content">
            <comMomentItem :data="item" simple></comMomentItem>
          </div>
        </div>
      </div>
      <div class="list dark">
        <div class="title">最扎心现实</div>
        <div :class="['item']" v-for="(item, index) in bottom10List" :key="item._id.toString()">
          <div class="emoji">{{ item.mood.emoji }}</div>
          <div class="content">
            <comMomentItem :data="item" simple></comMomentItem>
          </div>
        </div>
      </div>
      <div class="list good">
        <div class="title">最回味无穷</div>
        <div :class="['item']" v-for="(item, index) in good10List" :key="item._id.toString()"
          @click="router.push('/article/' + item._id)">
          <div class="emoji">{{ item.mood.emoji }}</div>
          <div class="content">
            <div class="food">{{ item.mood.food }}</div>
          </div>
        </div>
      </div>
      <div class="list bad">
        <div class="title">最难以下咽</div>
        <div :class="['item']" v-for="(item, index) in bad10List" :key="item._id.toString()"
          @click="router.push('/article/' + item._id)">
          <div class="emoji">{{ item.mood.emoji }}</div>
          <div class="content">
            <div class="food">{{ item.mood.food }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'statist' })

import $http from "@/utils/http.js";
import comArticleItem from '../components/articleItem.vue'
import comMomentItem from '../components/momentItem.vue'

const router = useRouter();
const pageEl = ref<any>(null)
const scrollTop = ref(0)

const top10List = ref([])
const bottom10List = ref([])
const good10List = ref([])
const bad10List = ref([])

$http.get('/api/st/moodRankList').then(res => {
  top10List.value = res.data.top10
  bottom10List.value = res.data.bottom10
  good10List.value = res.data.good10
  bad10List.value = res.data.bad10
})

onActivated(() => {
  pageEl.value?.scrollTo(0, sessionStorage['statist-page-scroll-top'])
})

function onScroll(e: any) {
  sessionStorage['statist-page-scroll-top'] = e.target.scrollTop
  scrollTop.value = e.target.scrollTop
}
</script>
<style lang="scss" scoped>
.statist {
  padding: 15px;
  box-sizing: border-box;
  overflow: auto;
  scroll-behavior: auto‌;

  .rank-list {
    display: flex;
    flex-wrap: wrap;

    .list {
      width: 50%;
      background-color: #ffd700;
      padding: 15px;
      box-sizing: border-box;

      &.dark {
        background-color: #00b4d8;
      }

      &.good {
        background-color: #ff6b6f;

        .item {
          align-items: center
        }
      }

      &.bad {
        background-color: #2b2d42;

        .item {
          align-items: center;
        }
      }

      .title {
        font-size: 30px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 15px;
      }

      .item {
        position: relative;
        padding: 10px;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 10px;
        display: flex;
        // align-items: center;

        .emoji {
          text-align: center;
          margin-right: 10px;
          font-size: 50px;
          min-width: 70px;
        }

        .content {
          flex: 1;
          overflow: hidden;

          .food {
            font-size: 20px;
            font-weight: bold;
            color: #333;
          }
        }
      }
    }
  }
}

@media screen and (max-width:1080px) {
  .statist {
    .list {
      width: 100% !important;
    }
  }
}
</style>