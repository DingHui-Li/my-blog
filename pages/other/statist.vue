<template>
  <div class="statist" @scroll="onScroll" ref="pageEl">
    <div class="rank-list">
      <div class="list">
        <div class="title">拒绝EMO</div>
        <div :class="['item']" v-for="(item, index) in top10List" :key="item._id.toString()">
          <div class="emoji">{{ item.mood?.emoji }}</div>
          <div class="content">
            <comMomentItem :data="item" simple></comMomentItem>
            <div class="info">
              <span class="time">{{ moment(item.createTime).fromNow() }}</span>
              <span class="location" v-if="item.location">
                <span v-if="item.location.city">
                  {{ item.location.city }}·
                </span>
                <span>{{ item.location.name || item.location }}</span>
              </span>
              <span class="weather" v-if="item.weather"> {{ item.weather.text }} {{ item.weather.temp
                }}°C
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="list dark">
        <div class="title">最扎心现实</div>
        <div :class="['item']" v-for="(item, index) in bottom10List" :key="item._id.toString()">
          <div class="emoji">{{ item.mood?.emoji }}</div>
          <div class="content">
            <comMomentItem :data="item" simple></comMomentItem>
            <div class="info">
              <span class="time">{{ moment(item.createTime).fromNow() }}</span>
              <span class="location" v-if="item.location">
                <span v-if="item.location.city">
                  {{ item.location.city }}·
                </span>
                <span>{{ item.location.name || item.location }}</span>
              </span>
              <span class="weather" v-if="item.weather"> {{ item.weather.text }} {{ item.weather.temp
                }}°C
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="list good">
        <div class="title">最人间美味</div>
        <div :class="['item']" v-for="(item, index) in good10List" :key="item._id.toString()"
          @click="router.push('/article/' + item._id)">
          <div class="emoji">{{ item.mood?.emoji }}</div>
          <div class="content">
            <div class="food">{{ item.mood.food }}</div>
            <div class="info">
              <span class="time">{{ moment(item.createTime).fromNow() }}</span>
              <span class="location" v-if="item.location">
                <span v-if="item.location.city">
                  {{ item.location.city }}·
                </span>
                <span>{{ item.location.name || item.location }}</span>
              </span>
              <span class="weather" v-if="item.weather"> {{ item.weather.text }} {{ item.weather.temp
                }}°C
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="list bad">
        <div class="title">最难以下咽</div>
        <div :class="['item']" v-for="(item, index) in bad10List" :key="item._id.toString()"
          @click="router.push('/article/' + item._id)">
          <div class="emoji">{{ item.mood?.emoji }}</div>
          <div class="content">
            <div class="food">{{ item.mood.food }}</div>
            <div class="info">
              <span class="time">{{ moment(item.createTime).fromNow() }}</span>
              <span class="location" v-if="item.location">
                <span v-if="item.location.city">
                  {{ item.location.city }}·
                </span>
                <span>{{ item.location.name || item.location }}</span>
              </span>
              <span class="weather" v-if="item.weather"> {{ item.weather.text }} {{ item.weather.temp
                }}°C
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'statist' })

import moment from "moment";
import $http from "@/utils/http.js";
import comArticleItem from '../components/articleItem.vue'
import comMomentItem from '../components/momentItem.vue'
import { Article } from "~/types";

const router = useRouter();
const pageEl = ref<any>(null)

const top10List = ref<Array<Article>>([])
const bottom10List = ref<Array<Article>>([])
const good10List = ref<Array<Article>>([])
const bad10List = ref<Array<Article>>([])

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
          align-items: center;

          .info {
            margin-top: 5px;
          }
        }
      }

      &.bad {
        background-color: #2b2d42;

        .item {
          align-items: center;

          .info {
            margin-top: 5px;
          }
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

          .info {
            // display: flex;
            // align-items: center;
            // text-align: right;

            .time {
              margin-right: 10px;
              color: #999;
              font-size: 13px;
            }

            .location {
              // display: flex;
              // align-items: center;
              font-size: 13px;
              color: #888;
              opacity: 0.8;
              // color: var(--primary-color);
              cursor: pointer;

              .icon {
                position: relative;
                transform: translateY(2px);
                font-size: 16px;
                margin-right: 2px;
              }
            }

            .weather {
              font-size: 13px;
              color: #999;
              margin-left: 10px;
              cursor: pointer;
            }
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