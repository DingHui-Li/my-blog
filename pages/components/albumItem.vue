<template lang="pug">
.year(v-if='showYear') {{ new Date(data.updateTime).getFullYear() }}年
.moment-item
  .month
    span(v-if="showMonth") {{ new Date(data.updateTime).getMonth()+1 }}月
  .right
    .info
      .title {{data.title}}
        span (共{{ data.imgs.length }}张)
      .time 更新于 {{moment(data.updateTime).fromNow()}}
    .topics
      TopicTag(v-for='item in data.topics' :data='item')
    .imgs(@click="router.push('/article/'+data._id)")
      .img(v-for='(item,index) in data.imgs.slice(0,3)' :style="getImgStyle(index)")
        img(:src='item+"?x-oss-process=image/resize,m_fill,w_400"' :style="`filter: blur(${index * 5}px)`")
</template>
<script setup>
import moment from "moment";
import TopicTag from "./topicTag.vue";
const router = useRouter();
const props = defineProps({
  data: Object,
  showMonth: {
    type: Boolean,
    default: false
  },
  showYear: {
    type: Boolean,
    default: false
  }
});
const sys = useSysStore()
let profile = sys.globalSetting.profile

function getImgStyle(index) {
  let style = `position:${index > 0 ? 'absolute' : 'relative'};
  top:${10 * index}px;right:${-10 * index}px;
  z-index:${3 - index};transition-delay:${index * 50}ms`
  return style
}
</script>
<style lang='scss' scoped>
.year {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.moment-item {
  margin-bottom: 0;
  display: flex;

  .month {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    width: 50px;
  }

  .right {
    flex: 1;
    overflow: hidden;

    .info {

      .title {
        font-size: 14px;
        color: #3f51b5;
        word-break: break-all;
        font-weight: bold;
        color: 3f51b5;

        span {
          font-size: 12px;
          color: #333;
          margin-left: 5px;
        }
      }

      .time {
        font-size: 12px;
        color: #999;
        margin-top: 2px;
      }
    }

    .imgs {
      position: relative;
      margin-top: 10px;
      padding-bottom: 40px;
      cursor: pointer;
      max-width: 250px;

      &:hover {
        .img {
          transform: scale(1.06);
        }
      }

      .img {
        top: 0;
        max-width: 250px;
        aspect-ratio: 1;
        border-radius: 8px;
        overflow: hidden;
        transition: all .3s;
        transform-origin: 0 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>