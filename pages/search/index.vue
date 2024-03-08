<template lang="pug">
.search-page
  //- Topics(@selected='v=>topics=v')
  .search-box
    input.input(v-model="keyword" @blur='handleSearch' placeholder="输入关键字")
    el-icon.icon
      Search
  .list(v-if='result.length')
    .title 搜索结果
      .item(:class="type" v-for="(item,index) in result" :key='item._id' :style="`animation-delay:${index%10*100}ms`")
        comMomentItem(v-if='item.type=="moment"' :data='item')
        comAlbumItem(v-else-if='item.type=="photo"' :showMonth='true' :data='item')
        comArticleItem(v-else :data='item')
  .empty(v-if="!loading&&!result.length&&searched") 无结果
</template>
<script setup>
import Topics from "./components/topics.vue";
import { Search } from "@element-plus/icons-vue";
import $http from "@/utils/http.js";
import comArticleItem from '../components/articleItem'
import comMomentItem from '../components/momentItem'
import comAlbumItem from '../components/albumItem'

let topics = ref({});
let keyword = ref("");
let result = ref([]);
let loading = ref(false);
let searched = ref(false);

function handleSearch() {
  loading.value = true;
  $http
    .get("/api/article/search", {
      keyword: keyword.value,
      topics: Object.keys(topics.value),
    })
    .then((res) => {
      result.value = res.data;
    })
    .finally(() => {
      loading.value = false;
      searched.value = true;
    });
}
</script>
<style lang="scss" scoped>
.search-page {
  background: #fff;
  padding: 15px;
  min-height: 100%;

  .search-box {
    display: flex;
    align-items: center;
    background: var(--primary-color);
    border-radius: 30px;
    margin: 60px auto;
    padding: 0 15px;
    max-width: 600px;

    .input {
      flex: 1;
      overflow: hidden;
      background: none;
      border: none;
      padding: 10px;
      outline: none;
      color: #fff;
      font-size: 18px;

      &::placeholder {
        color: #ffffff80;
        font-size: 13px;
      }
    }

    .icon {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .list {
    .item {
      padding: 15px;
      padding-left: 30px;
      padding-bottom: 30px;
      margin-bottom: 30px;
      border-bottom: 1px solid #eee;
    }
  }

  .empty {
    font-size: 14px;
    color: #999;
    text-align: center;
    padding: 30px;
  }
}
</style>
