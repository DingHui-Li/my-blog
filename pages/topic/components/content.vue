<template lang="pug">
.content-container
  .list
    div(v-for="page in list")
      .item(v-for="item in page" @click='router.push("/article/"+item._id)')
        img.cover(v-if='item.cover' :src='`${item.cover}?x-oss-process=image/resize,m_fill,w_400`')
        .right
          .subtitle
            TopicTag(v-for="topic in item.topics" :data='topic')
            .date {{moment(item.updateTime).fromNow()}}
          .title {{ item.title }}
          .desc {{item.desc}}...
    .empty(v-if="!list.length&!pagation.loading") 无数据
</template>
<script setup>
const router = useRouter();
import $http from "@/utils/http.js";
import moment from "moment";
import TopicTag from "~/pages/components/topicTag.vue";

const route = useRoute();

let pagation = ref({
  page: 1,
  size: 10,
  loading: false,
  isMore: true,
});
let list = ref([]);
getList();

function getList(page = 1) {
  if (pagation.value.loading) return;
  console.log("get list");
  pagation.value.loading = true;
  $http
    .get("/api/article", {
      page,
      size: pagation.value.size,
      topic: route.params.id,
    })
    .then((res) => {
      if (res.data.list?.length) {
        list.value[page] = res.data.list;
        pagation.value.page = page;
        pagation.value.isMore = page * pagation.value.size < res.data.total;
      }
    })
    .finally(() => {
      pagation.value.isMore = false;
      pagation.value.loading = false;
    });
}
</script>
<style lang="scss" scoped>
.content-container {
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  .list {
    .item {
      display: flex;
      cursor: pointer;
      padding-bottom: 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid #99999950;
      &:last-child {
        border: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      &:hover {
        .right {
          .subtitle {
            .topic {
              border-color: orangered;
              color: orangered;
            }
          }
          .title {
            color: orangered;
          }
        }
      }
      .cover {
        width: 250px;
        height: 160px;
        border-radius: 10px;
        object-fit: cover;
        margin-right: 20px;
      }
      .right {
        flex: 1;
        overflow: hidden;
        word-break: break-all;
        .subtitle {
          display: flex;
          align-items: center;
          margin: 15px 0;
          .topic {
            font-size: 12px;
            border-radius: 30px;
            border: 1px solid #999;
            padding: 2px 10px;
            margin-right: 10px;
            transition: all 0.3s;
          }
          .date {
            font-size: 12px;
            color: #999;
          }
        }
        .title {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
          transition: all 0.3s;
        }
        .desc {
          font-size: 14px;
          color: #777;
        }
      }
    }
  }
  .empty {
    text-align: center;
    font-size: 15px;
    color: #999;
    margin: 100px 0;
  }
}
@media screen and (max-width: 1080px) {
  .list {
    .item {
      // display: block !important;
      align-items: center;
      .cover {
        width: 80px !important;
        height: 60px !important;
      }
      .title {
        font-size: 16px !important;
      }
    }
  }
}
</style>
