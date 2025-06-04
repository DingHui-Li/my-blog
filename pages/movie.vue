<template>
  <div class="movie-page">
    <div class="mask" v-if="showInfo" @click="showInfo = false"></div>
    <div :class="['info', showInfo && 'show']">
      <div class="close" @click="showInfo = false">
        <el-icon color="red" :size="30">
          <CloseBold />
        </el-icon>
      </div>
      <img class="bg" v-if="list?.length && selected?._id" :src="selected.movie.cover" referrerpolicy="no-referrer">
      <div class="content" v-if="list?.length && selected?._id">
        <div class="rate">
          <el-icon color="#FF9800" :size="20">
            <StarFilled />
          </el-icon>
          {{ selected.movie.rate }}
          <div class="btn" @click="openMovie">豆瓣</div>
        </div>
        <div class="title">{{ selected.movie.title }}</div>
        <div class="desc">{{ selected.movie.meta }}</div>
        <div class="time">{{ moment(selected.createTime).format('LLLL') }}</div>
        <div class="text">{{ selected.textContent }}
          <comReply :data="selected.ai" style="background-color: #999; margin-top: 15px;"></comReply>
        </div>
      </div>
    </div>
    <div class="sort">
      按
      <div :class="['item', sort == 'date' && 'active']" @click="handleChooseSort('date')">日期</div>/
      <div :class="['item', sort == 'mood' && 'active']" @click="handleChooseSort('mood')">喜好</div>
      排序
    </div>
    <div class="group" v-for="key in group.keys()">
      <div class="label">{{ key }}（{{ group.get(key)?.length }}）</div>
      <div class="list">
        <div class="item" v-for="(item, index) in group.get(key)" @click="handleSelect(item)">
          <img class="bg" :src="item.movie.cover" referrerpolicy="no-referrer">
          <div class="content">
            <div class="title">
              {{ item.movie.title.split(' ')[0] }}
              <!-- <div v-for="word in item.movie.title.split(' ')[0]">{{ word }}</div> -->
            </div>
            <div class="rate">{{ item.movie.rate.split('(')[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import { StarFilled, CloseBold } from "@element-plus/icons-vue";
import useList from "@/hooks/useList";
import { Article } from "~/types";
import moment from "moment";
import comReply from "~/pages/components/reply.vue";

let { pagination, list, getList } = useList<Article>("/api/article");
pagination.value.size = 100000
const selected = ref<Article | null>()
const showInfo = ref(false)
const sort = ref('date')//mood
if (process.client) {
  nextTick(() => {
    sort.value = localStorage['movie-sort'] || "date"
  })
}

const group = computed(() => {
  let t: Map<string, Array<Article>> = new Map()
  if (sort.value == 'date') {
    list.value.forEach(item => {
      let year = new Date(item.createTime).getFullYear()
      if (t.get(year + "年")) {
        t.get(year + "年")?.push(item)
      } else {
        t.set(year + "年", [item])
      }
    })
  } else {
    let level: Array<string> = ['导演，收下我的膝盖！', '好看，但羞于安利', '能看，但适合拆薯片', '能忍，但想给编剧寄刀片', '快跑！别回头！']
    level.forEach(item => {
      t.set(item, [])
    })
    list.value.forEach(item => {
      if (item.mood?.score >= 9) {
        t.get(level[0])?.push(item)
      } else if (item.mood?.score >= 7) {
        t.get(level[1])?.push(item)
      }
      else if (item.mood?.score >= 5) {
        t.get(level[2])?.push(item)
      }
      else if (item.mood?.score >= 3) {
        t.get(level[3])?.push(item)
      }
      else {
        t.get(level[4])?.push(item)
      }
    })
  }
  return t
})

getList({
  type: "movie",
  page: pagination.value.page,
  size: pagination.value.size
})

function handleChooseSort(t: string) {
  sort.value = t
  localStorage['movie-sort'] = t
}
function openMovie() {
  if (list.value?.length) {
    window.open(selected.value?.movie?.link, '_blank')
  }
}
function handleSelect(item: Article) {
  selected.value = null
  nextTick(() => {
    selected.value = item
    showInfo.value = true
  })
}
</script>
<style lang="scss" scoped>
.movie-page {
  position: relative;
  height: 100%;
  overflow: auto;

  .mask {
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
  }

  .info {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.6);
    z-index: 12;
    width: 90%;
    min-height: 50vh;
    max-height: 70vh;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 10px 10px 20px 10px rgba(0, 0, 0, 0.1);
    transition: all .3s;
    opacity: 0;
    pointer-events: none;


    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &.show {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    .close {
      position: absolute;
      z-index: 9;
      top: 15px;
      right: 15px;
      color: #fff;
      cursor: pointer;
    }

    .bg {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all .3s;
      filter: blur(20px);
      transform: scale(1.1);
      // opacity: 0;
      // animation: zoom-in .5s forwards;
    }

    .content {
      position: relative;
      height: 100%;
      overflow: auto;
      z-index: 2;
      color: #fff;
      padding: 30px;
      padding-bottom: 0 !important;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;

      .rate {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }

      .title {
        font-size: 20px;
        font-weight: bold;
        margin: 5px 0;
      }

      .desc {
        font-size: 12px;
        margin-bottom: 5px;
        opacity: 0.8;
      }

      .text {
        flex: 1;
        overflow: auto;
        margin: 5px 0;
        color: #fff;
        word-break: break-all;
        white-space: pre-wrap;
        border-top: 1px solid #333;
        padding-top: 15px;
        padding-bottom: 15px;
      }

      .time {
        font-size: 12px;
        margin-bottom: 10px;
        text-align: right;
      }

      .btn {
        position: relative;
        padding: 2px 5px;
        // border: 1px solid #fff;
        background-color: #00B51D;
        width: fit-content;
        font-size: 12px;
        margin-left: 15px;
        cursor: pointer;
        color: #fff;
        user-select: none;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -19px;
          border: 10px solid transparent;
          border-right-color: #00B51D;
        }

        &:active {
          opacity: 0.8;
        }
      }
    }
  }

  .sort {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #fff;
    padding-top: 15px;
    padding-right: 45px;
    user-select: none;

    .item {
      color: #999;
      cursor: pointer;
      padding: 0 2px;

      &:hover {
        opacity: 0.7;
      }

      &.active {
        color: var(--primary-color);
        font-weight: bold;
      }
    }
  }

  .group {
    .label {
      font-size: 30px;
      font-weight: bold;
      color: #fff;
      padding-left: 15px;
      margin-top: 30px;
    }
  }

  .list {
    padding: 15px;

    .item {
      display: inline-block;
      position: relative;
      width: 80px;
      aspect-ratio: 1/7;
      background-size: cover;
      overflow: hidden;
      margin-right: 5px;
      // margin-bottom: 10px;
      cursor: pointer;
      user-select: none;
      border-radius: 10px;

      .bg {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .5s;
      }

      &:hover {
        .bg {
          transform: scale(1.05);
        }
      }

      .content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 2;
        height: 100%;
        color: #fff;
        font-size: 15px;
        padding: 10px;
        word-break: break-all;
        box-sizing: border-box;

        .title {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 20px;
          font-weight: bold;
          padding: 0 20px;
          word-break: break-all;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .rate {
          font-size: 12px;
          color: #FF9800;
          font-weight: bold;
          margin-top: 15px;
          text-align: center;
        }
      }

      &::before {
        content: '';
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
      }
    }
  }
}

@media screen and (max-width:750px) {
  .info {
    aspect-ratio: 1 !important;

    .content {
      padding: 15px !important;
    }
  }

  .group {
    .label {
      margin: 0 auto;
      text-align: center;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .item {
      margin-bottom: 10px;
      aspect-ratio: 10/30 !important;

      .content {
        .title {
          font-size: 15px !important;
        }
      }
    }
  }
}

@keyframes zoom-in {
  0% {
    opacity: 0;
    transform: translateY(100%) scale(0.5);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1.1);
  }
}
</style>