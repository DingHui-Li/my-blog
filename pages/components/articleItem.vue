<template>
  <div class="article-item" @click="jumpArticle(data._id)">
    <div class="content-box">
      <div class="title">{{ data.title }}</div>
      <div class="subtitle">
        <TopicTag v-for="topic in data.topics" :data="topic"></TopicTag>
        <div class="date">{{ moment(Number(data.createTime)).fromNow() }}</div>
      </div>
      <div class="desc">{{ data.desc }}...</div>
    </div><img class="cover" v-if="data.cover" :src="`${data.cover}?x-oss-process=image/resize,m_fill,w_400`" />
  </div>
</template>
<script setup lang="ts">
import TopicTag from "./topicTag.vue";
import moment from "moment";
import { Article } from "~/types";

const router = useRouter();

const props = defineProps<{ data: Article }>();

function jumpArticle(id: String) {
  router.push(`/article/${id}#article`);
}
</script>
<style lang='scss' scoped>
.article-item {
  display: flex;
  align-items: center;
  width: 100%;
  // border-bottom: 1px solid #99999920;
  padding-bottom: 10px;
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
      font-size: 16px;
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