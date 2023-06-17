<template lang="pug">
.recent
  .header
    .title 最近发布
  .content
    .left(v-if="list.length" @click="jumpArticle(list[0]._id)")
      img.cover( v-if='list[0].cover' :src='`${list[0].cover}?x-oss-process=image/resize,m_fill,w_1080`')
      .subtitle
        TopicTag(v-for="topic in list[0].topics" :data='topic')
        .date {{moment(list[0].updateTime).fromNow()}}
      .title {{ list[0].title }}
      .desc {{ list[0].desc }}
    .right(v-if="list.length>1")
      .item(v-for="item in list" @click="jumpArticle(item._id)")
        .content-box
          .subtitle
            TopicTag(v-for="topic in item.topics" :data='topic')
            .date {{moment(item.updateTime).fromNow()}}
          .title {{ item.title }}
        img.cover( v-if='item.cover' :src='`${item.cover}?x-oss-process=image/resize,m_fill,w_400`')
</template>
<script setup>
import moment from "moment";
import TopicTag from "./topicTag.vue";

const router = useRouter();

const props = defineProps({
  list: Array,
});

function jumpArticle(id) {
  router.push(`/article/${id}`);
}
</script>
<style lang="scss" scoped>
.recent {
  padding: 30px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }
  }
  .date {
    font-size: 12px;
    color: #999;
  }
  .content {
    display: flex;
    margin-top: 15px;
    .left {
      flex: 3;
      overflow: hidden;
      padding-right: 15px;
      margin-right: 15px;
      border-right: 1px solid #99999940;
      cursor: pointer;
      &:hover {
        .title {
          color: orangered;
        }
      }
      .cover {
        width: 100%;
        aspect-ratio: 16/9;
        border-radius: 15px;
        object-fit: cover;
        position: relative;
        transition: all 0.3s;
      }
      .subtitle {
        display: flex;
        align-items: center;
        padding: 15px 0;
      }
      .title {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        transition: all 0.2s;
      }
      .desc {
        font-size: 12px;
        color: #777;
        margin-top: 15px;
      }
    }
    .right {
      flex: 2;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #99999940;
        padding-bottom: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        &:last-child {
          border: none;
        }
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
          }
          .title {
            font-size: 14px;
            color: #333;
            font-weight: bold;
            transition: all 0.3s;
          }
        }
        .cover {
          width: 80px;
          height: 60px;
          border-radius: 10px;
          object-fit: cover;
        }
      }
    }
  }
}
@media screen and (max-width: 1080px) {
  .recent {
    padding: 15px;
    .content {
      .left {
        display: none;
      }
    }
  }
}
</style>
