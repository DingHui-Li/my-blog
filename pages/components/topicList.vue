<template lang="pug">
.topic-list
  .header
    .title 主题列表
    .pagation(v-if="topics.length>slidesPerView")
      .btn(@click="controlledSwiper.slidePrev()")
        el-icon
          ArrowLeft
      .btn(@click="controlledSwiper.slideNext()")
        el-icon
          ArrowRight
  .list
    Swiper(:modules='[FreeMode,Controller]' 
    :freeMode='true'
    :slidesPerView='slidesPerView' 
    :space-between="10"
    @swiper='e=>controlledSwiper=e')
      SwiperSlide(v-for="item in topics" height='250px' style='border-radius: 10px;overflow: hidden;')
        .topic(ref='topicEls' @click="router.push(`/topic/${item._id}`)")
          img.img(draggable="false" :src='`${item.cover}?x-oss-process=image/resize,m_fill,w_600`')
          .content
            .title {{item.name}}
            //- .subtitle aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
</template>
<script setup>
import { ArrowRight, ArrowLeft } from "@element-plus/icons-vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Controller } from "swiper";
import "swiper/css";

const props = defineProps({
  topics: Array,
});

const router = useRouter();
const controlledSwiper = ref(null);
let slidesPerView = ref(6);

onMounted(() => {
  if (window.innerWidth < 1080) {
    slidesPerView.value = parseInt(window.innerWidth / 180);
  }
});
</script>
<style lang="scss" scoped>
.topic-list {
  padding: 30px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .title {
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }
    .pagation {
      display: flex;
      .btn {
        border: 1px solid #999;
        border-radius: 5px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          background: orangered;
          border-color: orangered;
        }
      }
    }
  }
  .list {
    white-space: nowrap;
    overflow: hidden;
    .swiper {
    }
    .topic {
      position: relative;
      overflow: hidden;
      user-select: none;
      cursor: pointer;
      width: 100%;
      height: calc(170px / 0.68);
      .img {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
        transition: all 0.3s;
      }
      &:hover {
        .img {
          transform: scale(1.2);
        }
      }
      .content {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 15px;
        box-sizing: border-box;
        word-break: break-all;
        white-space: pre-wrap;

        .title {
          font-size: 20px;
          color: #fff;
          line-height: 20px;
          word-break: break-all;
        }
        .subtitle {
          font-size: 12px;
          line-height: 12px;
          color: #ffffff90;
          margin-top: 10px;
        }
      }
    }
  }
}
@media screen and (max-width: 1080px) {
  .topic-list {
    padding: 15px;
    .list {
      .topic {
        &:hover {
          .img {
            transform: scale(1) !important;
          }
        }
      }
    }
  }
}
</style>
