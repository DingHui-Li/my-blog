<template lang="pug">
.left-side
  //- .recent-list
  //-   .header
  //-     .title 热门
  //-   .big-item
  //-     img.cover(src='https://img1.baidu.com/it/u=7456317,4282812646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500')
  //-     .subtitle
  //-       .topic topic
  //-       .date 2小时前
  //-     .title 数组的算数运算与广播机制
  //-   .item(v-for="item in  3")
  //-     .dot
  //-     .title 数组的算数运算与广播机制数组的算数运算与广播机制
  .other-topics
    .title 主题列表
    .list
      .topic(v-for="item in topics" 
        @click="jumpTopic(item._id)"
        :class="item._id==route.params.id&&'active'") {{ item.name }}
</template>
<script setup>
import $http from "@/utils/http.js";
const route = useRoute();
const router = useRouter();

let topics = ref([]);
getTopicList();

function getTopicList() {
  $http.get("/api/topic").then((res) => {
    topics.value = res?.data;
  });
}
function jumpTopic(id) {
  router.replace("/topic/" + id);
}
</script>
<style lang="scss" scoped>
.left-side {
  width: 100%;
  height: 100%;
  .recent-list {
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    .header {
      margin-bottom: 15px;
      .title {
        font-size: 13px;
        font-weight: bold;
        color: #666;
      }
    }
    .big-item {
      padding-bottom: 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid #99999960;
      cursor: pointer;
      &:hover {
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
      .cover {
        width: 100%;
        height: 170px;
        border-radius: 10px;
        object-fit: cover;
      }
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
        font-size: 15px;
        font-weight: bold;
        color: #333;
        transition: all 0.3s;
      }
    }
    .item {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      cursor: pointer;
      &:hover {
        .dot {
          background: orangered;
        }
        .title {
          color: orangered;
        }
      }
      .dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #666;
        margin-right: 15px;
        transition: all 0.3s;
      }
      .title {
        flex: 1;
        overflow: hidden;
        word-break: break-all;
        font-size: 12px;
        color: #333;
        transition: all 0.3s;
      }
    }
  }
  .other-topics {
    position: sticky;
    top: 80px;
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    padding-right: 5px;
    padding-bottom: 5px;
    .title {
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #666;
    }
    .list {
      .topic {
        display: inline-block;
        background: #e8eaf0;
        padding: 3px 10px;
        border-radius: 5px;
        font-size: 12px;
        color: #777;
        font-weight: bold;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #e8eaf0;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          border-color: orangered;
        }
        &.active {
          background: orangered;
          border-color: orangered;
          color: #fff;
        }
      }
    }
  }
}
</style>
