<template lang="pug">
.moment-item
  .avatar
    img(:src='profile?.avatar+"?x-oss-process=image/resize,m_fill,w_100"')
  .right
    .user-info
      .name {{profile?.name}}
      .time {{moment(data.createTime).format('LLLL')}}
    .content {{data.textContent}}
    .topics
      TopicTag(v-for='item in data.topics' :data='item')
    .imgs
      Vimg.img(:class=`data.imgs.length==1&&'single'` v-for='(item,index) in data.imgs' :style="`width:${data.imgs.length==1?100:data.imgs.length==2?50:33.33}%;`" :src='item' :thumb='item+"?x-oss-process=image/resize,m_fill,w_400"')
    .info
      .location(v-if="data.location")
        el-icon.icon
          LocationFilled
        span {{data.location}}
      .weather(v-if='data.weather' @click='openWeather')  {{ data.weather.text }} {{ data.weather.temp }}°C
</template>
<script setup>
import { storeToRefs } from 'pinia'
import moment from "moment";
import TopicTag from "./topicTag.vue";
import { LocationFilled } from '@element-plus/icons-vue'

const router = useRouter();
const props = defineProps({
  data: Object,
});
const { globalSetting } = storeToRefs(useSysStore())
const profile = computed(() => globalSetting.value.profile || {})

function openWeather() {
  if (props.data.weather?.fxLink) {
    window.open(props.data.weather?.fxLink, '_blank')
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