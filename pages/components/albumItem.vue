<template lang="pug">
.moment-item
  .avatar
  .right
    .user-info
      .name xxxxx
      .time {{moment(data.updateTime).fromNow()}}
    .title {{data.title}}
      span (共{{ data.imgs.length }}张)
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
});

function getImgStyle(index) {
  let style = `position:${index > 0 ? 'absolute' : 'relative'};
  top:${10 * index}px;right:${-10 * index}px;
  z-index:${3 - index};`
  return style
}
</script>
<style lang='scss' scoped>
.moment-item {
  margin-bottom: 90px;
  display: flex;

  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 8px;
    background-color: var(--primary-color);
    margin-right: 10px;
  }

  .right {
    flex: 1;
    overflow: hidden;

    .user-info {

      .name {
        font-size: 15px;
        font-weight: bold;
        color: #3f51b5;
      }

      .time {
        font-size: 12px;
        color: #999;
        margin-top: 2px;
      }
    }

    .title {
      margin-top: 5px;
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

    .imgs {
      position: relative;
      margin-top: 10px;
      padding-bottom: 40px;
      cursor: pointer;
      max-width: 250px;

      &:hover {
        .img {
          &:first-child {
            transform: scale(1.09);
          }
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