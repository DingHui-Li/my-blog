<template>
  <div class="movie-page">
    <div v-if="list?.length" class="info">
      <img class="bg" :src="list[selected].movie.cover" referrerPolicy="no-referrer">
      <div class="content">
        <div class="rate">
          <el-icon color="#FF9800" :size="20">
            <StarFilled />
          </el-icon>
          {{ list[selected].movie.rate }}
        </div>
        <div class="title">{{ list[selected].movie.title }}</div>
        <div class="desc">{{ list[selected].movie.meta }}</div>
        <div class="text">{{ list[selected].textContent }}</div>
        <div class="time">——{{ moment(list[selected].createTime).format('LLLL') }}</div>
        <div class="btn" @click="openMovie">豆瓣</div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in list" @click="selected = index">
        <img class="bg" :src="item.movie.cover" referrerPolicy="no-referrer">
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

let { pagation, list, getList } = useList<Array<Article>>("/api/article");
const selected = ref(0)

getList({
  type: "movie",
  page: pagation.value.page,
  size: pagation.value.size
})

function openMovie() {
  if (list.value?.length) {
    window.open(list.value[selected.value].movie.link, '_blank')
  }
}
</script>
<style lang="scss" scoped>
.movie-page {
  height: calc(100vh - 55px);
  overflow: auto;

  .info {
    position: sticky;
    z-index: 9;
    width: 100%;
    aspect-ratio: 16/9;
    top: 0;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }

    .bg {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all .3s;
      filter: blur(10px);
      transform: scale(1.1);
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
        align-items: center
      }

      .title {
        font-size: 25px;
        font-weight: bold;
        margin: 5px 0;
      }

      .desc {
        font-size: 15px;
        margin-bottom: 20px;
      }

      .text {
        margin: 5px 0;
        color: #999;
      }

      .time {
        text-align: right;
        font-size: 12px;
        margin-top: 20px;
      }

      .btn {
        padding: 8px 30px;
        border-radius: 30px;
        border: 1px solid #fff;
        width: fit-content;
        font-size: 15px;
        margin: 0 auto;
        margin-top: 15px;
        cursor: pointer;
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
</style>