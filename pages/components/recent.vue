<template lang="pug">
.recent
  .header
    .title 最近发布
  .content
    .left(v-if="list.length" @click="jumpArticle(list[0]._id)")
      //- img.cover( v-if='list[0].cover' :src='`${list[0].cover}?x-oss-process=image/resize,m_fill,w_1080`')
      //- .subtitle
      //-   TopicTag(v-for="topic in list[0].topics" :data='topic')
      //-   .date {{moment(list[0].updateTime).fromNow()}}
      //- .title {{ list[0].title }}
      //- .desc {{ list[0].desc }}
    .right(v-if="list.length>1")
      comArticleItem(v-for="item in list" :data='item' )
        
</template>
<script setup>
import moment from "moment";
import comArticleItem from './articleItem'

const props = defineProps({
  list: Array,
});

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
    }

    .right {
      flex: 2;
      overflow: hidden;
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
