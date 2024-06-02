<template lang="pug">
.right-side(v-if="list.length")
  .title 相似文章
  .item(v-for="item in list" @click="router.push('/article/'+item._id)")
    img.cover(:src='`${item.cover}?x-oss-process=image/resize,m_mfit,w_400`')
    .content
      .subtitle
        TopicTag(v-for="topic in item.topics" :data='topic')
        .date {{moment(item.updateTime).fromNow()}}
      .title {{item.title}}
      .desc {{ item.desc }}...
</template>
<script setup>
import $http from "@/utils/http.js";
import TopicTag from "~/pages/components/topicTag.vue";
import moment from "moment";

const router = useRouter();

const props = defineProps({
  topics: Array,
  aid: String,
});

let list = ref([]);
watch(
  () => props.topics,
  () => {
    getList();
  }
);

function getList() {
  $http
    .get(`/api/article/${props.aid}/same`, {
      topics: props?.topics?.map((item) => item._id)?.join(","),
    })
    .then((res) => {
      list.value = res.data;
    });
}
</script>
<style lang="scss" scoped>
.right-side {
  position: sticky;
  top: 80px;
  background: #fff;
  padding: 15px;
  border-radius: 10px;

  .title {
    font-size: 13px;
    font-weight: bold;
    color: #666;
    margin-bottom: 15px;
  }

  .item {
    padding-bottom: 15px;
    margin-bottom: 15px;
    cursor: pointer;

    &:hover {
      .title {
        color: orangered;
      }
    }

    .cover {
      width: 100%;
      height: auto;
      aspect-ratio: 16/9;
      border-radius: 10px;
      object-fit: cover;
    }

    .subtitle {
      display: flex;
      align-items: center;
      margin: 10px 0;

      .date {
        font-size: 12px;
        color: #999;
      }
    }

    .title {
      font-size: 15px;
      font-weight: bold;
      color: #333;
      transition: all 0.3s;
    }

    .desc {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
  }
}

@media screen and (max-width: 1080px) {
  .item {
    display: flex;
    align-items: center;
    border-top: 1px solid #eee;
    padding-top: 10px;

    .cover {
      width: 80px !important;
      height: 60px !important;
      margin-right: 15px;
    }

    .title {
      margin-bottom: 5px;
    }
  }
}
</style>
