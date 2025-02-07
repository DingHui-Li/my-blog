<template>
  <div class="moment-item">
    <!-- <div class="avatar">
      <img :src='profile?.avatar + "?x-oss-process=image/resize,m_mfit,w_100"' />
    </div> -->
    <el-tooltip v-if="data.onlySelf" content="仅博主可见" placement="left">
      <el-icon class="only-self">
        <View />
      </el-icon>
    </el-tooltip>
    <div class="right">
      <div class="user-info">
        <!-- <div class="name">{{ profile?.name }}</div> -->
        <!-- <div class="time">
          <el-icon class="icon">
            <Clock></Clock>
          </el-icon>
          {{ moment(data.createTime).format('LLLL') }}
        </div> -->
      </div>
      <div class="article" v-if="data.type == 'article'">
        <comArticleItem :data="data" />
      </div>
      <template v-else>
        <div class="content">{{ data.textContent }}</div>
        <div class="topics">
          <TopicTag v-for="item in data.topics" :data="item"></TopicTag>
        </div>
        <div class="sounds" v-if="data.sounds">
          <div class="sound" v-for="item in data.sounds" :style="`width:${(item.duration / 30) * 100}%`">
            <Sound :src="item.src" :duration="item.duration" />
          </div>
        </div>
        <div class="imgs" v-if="data.imgs.length">
          <VImg :class="['img', data.imgs.length == 1 && 'single']" v-for="(item, index) in data.imgs"
            :style="`width:${data.imgs.length == 1 ? 100 : [2, 4].includes(data.imgs.length) ? 50 : 33.33}%;`"
            :src="item" :thumb='item + "?x-oss-process=image/resize,m_mfit,w_355"'
            :aspect-ratio="data.imgs.length == 1 ? 'auto' : 1">
          </VImg>
        </div>
        <div class="movie" v-if="data.movie && data.movie.link" @click="openMovie">
          <img :src="data.movie.cover" referrerpolicy="no-referrer" />
          <div class="movie-info">
            <div class="name">{{ data.movie.title }}</div>
            <div class="rate">{{ data.movie.rate }}</div>
          </div>
        </div>
        <div class="info">
          <span class="location" v-if="data.location" @click="openMap">
            <el-icon class="icon">
              <Location></Location>
            </el-icon>
            <span v-if="data.location.city">
              {{ data.location.city }}·
            </span>
            <span>{{ data.location.name || data.location }}</span>
          </span>
          <span class="weather" v-if="data.weather" @click="openWeather"> {{ data.weather.text }} {{ data.weather.temp
            }}°C
          </span>
        </div>
        <div class="user-info">
          <div class="time" style="color:#666;padding-left: 1px;">
            <el-icon class="icon" style="color:#666">
              <Clock></Clock>
            </el-icon>
            {{ moment(data.createTime).format('LLLL') }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import moment from "moment";
import TopicTag from "./topicTag.vue";
import { Location, Clock, View } from '@element-plus/icons-vue'
import { Article } from '~/types';
import comArticleItem from './articleItem.vue'
import VImg from '@/components/vimg/index.vue'

const router = useRouter();
const props = defineProps<{ data: Article }>();
const { globalSetting } = storeToRefs(useSysStore())
const profile = computed(() => globalSetting.value.profile || {})

function openWeather() {
  if (props.data.weather?.fxLink) {
    window.open(props.data.weather?.fxLink, '_blank')
  }
}
function openMovie() {
  if (props.data.movie?.link) {
    window.open(props.data.movie.link, '_blank')
  }
}
function openMap() {
  let latlng = props.data.location?.location
  if (latlng) {
    window.open(`https://ditu.amap.com/regeo?lng=${latlng.lng}&lat=${latlng.lat}&name=${props.data.location.name}`, '_blank')
    // if (props.data.location?.type == 'road') {
    //   window.open(`https://ditu.amap.com/regeo?lng=${latlng.lng}&lat=${latlng.lat}&name=${props.data.location.name}`, '_blank')
    // }
    // else if (props.data.location.id) {
    //   window.open(`https://uri.amap.com/poidetail?poiid=${props.data.location.id}&src=mypage&callnative=1`, "_blank")
    // }
  }
}
</script>
<style lang='scss' scoped>
.moment-item {
  display: flex;
  position: relative;

  .only-self {
    position: absolute;
    right: 5px;
    top: -15px;
  }

  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 8px;
    background-color: var(--primary-color);
    margin-right: 10px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .right {
    flex: 1;
    overflow: hidden;

    .user-info {
      margin-bottom: 5px;

      .name {
        font-size: 17px;
        font-weight: bold;
        color: var(--primary-color);
      }

      .time {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #999;
        margin-top: 2px;

        .icon {
          font-size: 14px;
          margin-right: 4px;
          color: #888;
        }
      }
    }

    .content {
      font-size: 16px;
      color: #222;
      word-break: break-all;
      white-space: pre-wrap;

      // &::first-letter {
      //   font-size: 30px;
      //   font-weight: bold;
      // }
    }

    .topics {
      margin-top: 10px;
      margin-bottom: 5px;
    }

    .sounds {

      .sound {
        box-sizing: border-box;
        height: 35px;
        padding-left: 6px;
        min-width: 100px;
        background: var(--primary-color);
        border-radius: 30px;
        overflow: hidden;
        margin-bottom: 5px;
      }
    }

    .imgs {
      margin-bottom: 5px;
      // border-radius: 15px;
      overflow: hidden;
      max-width: 500px;
      font-size: 0;
      // border: 1px solid #eee;

      .img {
        position: relative;
        display: inline-block;
        width: 33.333%;
        max-width: 350px;
        aspect-ratio: 1;
        overflow: hidden;
        box-sizing: border-box;
        // border-radius: 10px;
        padding-right: 2px;
        padding-bottom: 2px;

        &:nth-child(3n) {
          &::after {
            display: none;
          }
        }

        &:last-child {
          &::after {
            display: none;
          }
        }

        &.single {
          width: 100%;
          max-width: 100%;
          height: auto;
          aspect-ratio: auto;
          border-radius: 10px;
          padding: 0;
        }
      }
    }

    .article {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 5px;
    }

    .movie {
      display: flex;
      align-items: center;
      background-color: #f5f5f5;
      // border-radius: 5px;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 80px;
        aspect-ratio: 3/4;
        object-fit: cover;
        margin-right: 10px;
        // border-radius: 5px;
      }

      .movie-info {
        flex: 1;
        overflow: hidden;
        padding: 10px 0;

        .name {
          font-size: 14px;
        }

        .rate {
          font-size: 12px;
          color: #FF9800;
          font-weight: bold;
          margin: 5px 0;
        }

        .meta {
          font-size: 12px;
        }
      }
    }

    .info {
      // display: flex;
      // align-items: center;
      margin-top: 5px;

      .location {
        // display: flex;
        // align-items: center;
        font-size: 13px;
        color: #666;
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
        color: #666;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>