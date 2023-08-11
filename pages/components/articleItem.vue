<template lang="pug">
.item(@click="jumpArticle(data._id)")
  .avatar
    img(:src='profile?.avatar+"?x-oss-process=image/resize,m_fill,w_100"')
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
const sys = useSysStore()
let profile = sys.globalSetting.profile

function jumpArticle(id) {
  router.push(`/article/${id}`);
}
</script>
<style lang='scss' scoped>
.item {
  display: flex;
  // border-bottom: 1px solid #99999920;
  padding-bottom: 10px;
  margin-bottom: 80px;
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

  .content-box {
    flex: 1;
    overflow: hidden;
    margin-right: 30px;

    .subtitle {
      display: flex;
      align-items: center;
      padding: 5px 0;

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