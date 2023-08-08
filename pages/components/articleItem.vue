<template lang="pug">
.item(@click="jumpArticle(data._id)")
  .content-box
    .title {{ data.title }}
    .subtitle
      TopicTag(v-for="topic in data.topics" :data='topic')
      .date {{moment(data.updateTime).fromNow()}}
    .desc {{ data.desc }}...
  img.cover( v-if='data.cover' :src='`${data.cover}?x-oss-process=image/resize,m_fill,w_400`')
</template>
<script setup>
import TopicTag from "./topicTag.vue";
import moment from "moment";

const router = useRouter();

const props = defineProps({
  data: Object,
});

function jumpArticle(id) {
  router.push(`/article/${id}`);
}
</script>
<style lang='scss' scoped>
.item {
  display: flex;
  align-items: center;
  // border-bottom: 1px solid #99999920;
  padding-bottom: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &:last-child {
    border: none;
  }

  &:hover {
    .content-box {
      .title {
        color: var(--primary-color);
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
      color: #444;
    }
  }

  .cover {
    width: 100px;
    aspect-ratio: 5/5;
    border-radius: 10px;
    object-fit: cover;
  }
}
</style>