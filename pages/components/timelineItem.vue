<template>
  <div :class="['timeline-item', oneDay && 'one-day']">
    <div class="left">
      <div class="dot"></div>
      <div class="line"></div>
    </div>
    <div class="right">
      <div class="date" v-if="!oneDay">
        {{ new Date(data.createTime).format('dd') }}
        <span>{{ (data.createTimeObj?.getMonth() || 0) + 1 }}月</span>
        <span v-if="data.createTimeObj?.getFullYear() != currentYear">{{ data.createTimeObj?.getFullYear() }}年</span>
      </div>
      <div class="time">{{ new Date(data.createTime).format('hh:mm:ss') }}</div>
      <div class="content" @click="router.push('/article/' + data._id)">
        <span v-if="data.movie?.link">看了{{ data.movie.title.includes('剧集') ? "剧" : "电影" }}《{{ data.movie.title
          }}》</span>
        <span v-else-if="data.type == 'article'">写了文章：《{{ data.title }}》</span>
        <span v-else>{{ data.mood?.desc || data.textContent }}</span>
        {{ data.mood?.emoji }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Article } from '~/types';

const props = defineProps<{ data: Article, oneDay?: boolean }>();
const router = useRouter();
const currentYear = new Date().getFullYear()

</script>
<style lang="scss" scoped>
.timeline-item {
  display: flex;
  color: #fff;
  margin-top: 30px;

  &.one-day {
    margin-top: 5px;

    .left {
      .dot {
        display: none;
      }
    }
  }

  .left {
    position: relative;
    margin-right: 10px;
    text-align: center;
    width: 30px;

    .dot {
      display: inline-block;
      position: relative;
      z-index: 2;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: var(--primary-color);
      border: 3px solid #00000090;
      margin-top: 4px;
    }

    .line {
      position: absolute;
      z-index: 1;
      top: 5px;
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      height: 200%;
      background: #fff;
    }
  }

  .right {
    flex: 1;
    overflow: hidden;

    .date {
      font-size: 22px;
      color: var(--primary-color);
      margin-bottom: 5px;

      span {
        position: relative;
        font-size: 12px;
        left: -4px;
      }
    }

    .time {
      font-size: 12px;
      color: #999;
    }

    .content {
      font-size: 14px;
    }
  }
}
</style>