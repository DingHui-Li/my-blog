<template>
  <div class="moment-item">
    <div class="avatar">
      <img :src='profile?.avatar + "?x-oss-process=image/resize,m_fill,w_100"' />
    </div>
    <div class="right">
      <div class="user-info">
        <div class="name">{{ profile?.name }}</div>
        <div class="time">{{ moment(data.createTime).format('LLLL') }}</div>
      </div>
      <div class="content">{{ data.textContent }}</div>
      <div class="topics">
        <TopicTag v-for="item in data.topics" :data="item"></TopicTag>
      </div>
      <div class="imgs">
        <Vimg :class="['img', data.imgs.length == 1 && 'single']" v-for="(item, index) in data.imgs"
          :style="`width:${data.imgs.length == 1 ? 100 : data.imgs.length == 2 ? 50 : 33.33}%;`" :src="item"
          :thumb='item + "?x-oss-process=image/resize,m_fill,w_355"' />
      </div>
      <div class="movie" v-if="data.movie && data.movie.link" @click="openMovie">
        <img :src="data.movie.cover" crossOrigin="Anonmyous" referrerPolicy="no-referrer" />
        <div class="movie-info">
          <div class="name">{{ data.movie.title }}</div>
          <div class="rate">{{ data.movie.rate }}</div>
          <div class="meta">{{ data.movie.meta }}</div>
        </div>
      </div>
      <div class="info">
        <div class="location" v-if="data.location">
          <el-icon class="icon">
            <LocationFilled></LocationFilled>
          </el-icon><span>{{ data.location }}</span>
        </div>
        <div class="weather" v-if="data.weather" @click="openWeather"> {{ data.weather.text }} {{ data.weather.temp }}°C
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import moment from "moment";
import TopicTag from "./topicTag.vue";
import { LocationFilled } from '@element-plus/icons-vue'
import { Article } from '~/types';

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
</script>
<style lang='scss' scoped>
.moment-item {
  display: flex;

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
        color: #3f51b5;
      }

      .time {
        font-size: 12px;
        color: #999;
        margin-top: 2px;
      }
    }

    .topics {
      margin-bottom: 5px;
    }

    .content {
      font-size: 16px;
      color: #333;
      word-break: break-all;
      white-space: pre-wrap;
    }

    .imgs {
      max-width: 360px;
      margin-bottom: 5px;

      .img {
        display: inline-block;
        width: 33.333%;
        aspect-ratio: 1;
        overflow: hidden;
        padding-right: 5px;
        box-sizing: border-box;

        &.single {
          width: 100%;
          height: fit-content;
        }

        &:deep(.el-image) {
          // border-radius: 8px;
        }
      }
    }

    .movie {
      display: flex;
      align-items: center;
      background-color: #f5f5f5;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 80px;
        aspect-ratio: 3/4;
        object-fit: cover;
        margin-right: 10px;
        border-radius: 5px;
      }

      .movie-info {
        flex: 1;
        overflow: hidden;

        .name {
          font-size: 14px;
          font-weight: bold;
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
      display: flex;
      align-items: center;
      margin-top: 10px;

      .location {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #303F9F;

        .icon {
          margin-top: -1px;
          font-size: 16px;
        }
      }

      .weather {
        font-size: 13px;
        color: #303F9F;
        margin-left: 10px;
      }
    }
  }
}
</style>