<template>
  <div class="movie-page">
    <div class="info">
      <img v-if="list?.length && selected >= 0" class="bg" :src="list[selected].movie.cover" referrerpolicy="no-referrer">
      <div class="content" v-if="list?.length && selected >= 0">
        <div class="rate">
          <el-icon color="#FF9800" :size="20">
            <StarFilled />
          </el-icon>
          {{ list[selected].movie.rate }}
          <div class="btn" @click="openMovie">豆瓣</div>
        </div>
        <div class="title">{{ list[selected].movie.title }}</div>
        <div class="desc">{{ list[selected].movie.meta }}</div>
        <div class="text">{{ list[selected].textContent }}</div>
        <div class="time">——{{ moment(list[selected].createTime).format('LLLL') }}</div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in list" @click="handleSelect(index)">
        <img class="bg" :src="item.movie.cover" referrerpolicy="no-referrer">
        <div class="content">
          <div class="title">
            <div v-for="word in item.movie.title.split(' ')[0]">{{ word }}</div>
          </div>
          <div class="rate">{{ item.movie.rate.split('(')[0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { StarFilled } from "@element-plus/icons-vue";
import useList from "@/hooks/useList";
import { Article } from "~/types";
import moment from "moment";

let { pagination, list, getList } = useList<Array<Article>>("/api/article");
const selected = ref(0)

getList({
  type: "movie",
  page: pagination.value.page,
  size: pagination.value.size
})

function openMovie() {
  if (list.value?.length) {
    window.open(list.value[selected.value].movie.link, '_blank')
  }
}
function handleSelect(index: number) {
  selected.value = -1
  nextTick(() => {
    selected.value = index
  })
}
</script>
<style lang="scss" scoped>
.movie-page {
  height: 100%;
  overflow: auto;

  .info {
    position: sticky;
    z-index: 9;
    width: 100%;
    height: 50%;
    max-height: 500px;
    min-height: 200px;
    top: 0;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
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
      opacity: 0;
      animation: zoom-in .5s forwards;
    }

    .content {
      position: relative;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      z-index: 2;
      color: #fff;
      padding: 30px;
      box-sizing: border-box;

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
        margin-bottom: 20px;
        opacity: 0.8;
      }

      .text {
        margin: 5px 0;
        color: #999;
      }

      .time {
        text-align: right;
        font-size: 12px;
        margin-top: 10px;
      }

      .btn {
        padding: 8px 20px;
        border-radius: 30px;
        // border: 1px solid #fff;
        background-color: #00B51D;
        width: fit-content;
        font-size: 12px;
        margin-left: 15px;
        cursor: pointer;
        color: #fff;
        user-select: none;

        &:active {
          opacity: 0.8;
        }
      }
    }
  }

  .list {
    padding: 15px;

    .item {
      display: inline-block;
      position: relative;
      width: 80px;
      aspect-ratio: 10/50;
      background-size: cover;
      overflow: hidden;
      margin-right: 10px;
      cursor: pointer;
      user-select: none;

      .bg {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .3s;
      }

      &:hover {
        .bg {
          transform: scale(1.2);
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
          margin-bottom: 15px;
          font-size: 15px;
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
          text-align: right;
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

  .item {
    aspect-ratio: 10/30 !important;
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