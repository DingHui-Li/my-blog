<template lang="pug">
.moment-item
  .avatar
    img(:src='profile?.avatar+"?x-oss-process=image/resize,m_fill,w_100"')
  .right
    .user-info
      .name {{profile?.name}}
      .time {{moment(data.updateTime).fromNow()}}
    .content {{data.textContent}}
    .topics
      TopicTag(v-for='item in data.topics' :data='item')
    .imgs
      .img(v-for='(item,index) in data.imgs' :style="`width:${data.imgs.length==1?100:data.imgs.length==2?50:33.33}%`")
        el-image(:preview-teleported='true' :initial-index="index" style="width: 100%; height: 100%" fit='cover'  :src='item+"?x-oss-process=image/resize,m_fill,w_400"' :preview-src-list='data.imgs')
</template>
<script setup>
import moment from "moment";
import TopicTag from "./topicTag.vue";
const router = useRouter();
const props = defineProps({
  data: Object,
});
const sys = useSysStore()
let profile = sys.globalSetting.profile
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

    .content {
      margin-top: 5px;
      font-size: 14px;
      color: #333;
      word-break: break-all;
    }

    .imgs {
      max-width: 360px;
      margin-top: 5px;

      .img {
        display: inline-block;
        width: 33.333%;
        aspect-ratio: 1;
        overflow: hidden;
        padding-right: 5px;
        box-sizing: border-box;

        &:deep(.el-image) {
          border-radius: 8px;
        }
      }
    }
  }
}
</style>