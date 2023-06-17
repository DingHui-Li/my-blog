<template lang="pug">
.article-item(@click="router.push(`/article/${data._id}`)")
  .content-box
    .subtitle
      TopicTag(v-for="topic in data.topics" :data='topic')
      .date {{moment(data.updateTime).fromNow()}}
    .title {{ data.title }}
    .desc {{ data.desc }}...
  img.cover( v-if='data.cover' :src='`${data.cover}?x-oss-process=image/resize,m_fill,w_400`')
</template>
<script setup>
import moment from "moment";
import TopicTag from "~/pages/components/topicTag.vue";

const router = useRouter();

const props = defineProps({
  data: Object,
});
</script>
<style lang="scss" scoped>
.article-item {
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  padding: 10px 0;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    .content-box {
      .title {
        color: orangered;
      }
    }
  }
  .content-box {
    flex: 1;
    overflow: hidden;
    margin-right: 30px;
    .subtitle {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .date {
        font-size: 12px;
        color: #999;
      }
    }
    .title {
      font-size: 14px;
      color: #333;
      font-weight: bold;
      transition: all 0.3s;
    }
    .desc {
      font-size: 12px;
      color: #999;
      word-break: break-all;
      margin-top: 5px;
    }
  }
  .cover {
    width: 80px;
    height: 60px;
    border-radius: 10px;
    object-fit: cover;
  }
}
</style>
