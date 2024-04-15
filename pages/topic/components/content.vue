<template lang="pug">
.content-container
  .list
    .item(:class="item.type" v-for="(item,index) in list" :key='item._id' :style="`animation-delay:${index%10*100}ms`")
      comMomentItem(v-if='item.type=="moment"' :data='item')
      comAlbumItem(v-else-if='item.type=="photo"' :showMonth='true' :data='item')
      comArticleItem(v-else :data='item')
    .empty(v-if="!list.length&!pagination.loading") 无数据
    LoadMore(:loading="pagination.loading" :hasMore="pagination.isMore" @loadMore="loadMore")
</template>
<script setup>
const router = useRouter();
import $http from "@/utils/http.js";
import comArticleItem from '../../components/articleItem'
import comMomentItem from '../../components/momentItem'
import comAlbumItem from '../../components/albumItem'

const route = useRoute();

let pagination = ref({
  page: 1,
  size: 10,
  loading: false,
  isMore: true,
});
let list = ref([]);
getList();

function loadMore() {
  if (!pagination.value.loading && pagination.value.isMore) {
    getList(pagination.value.page + 1)
  }
}
function getList(page = 1) {
  if (pagination.value.loading) return;
  console.log("get list");
  pagination.value.loading = true;
  if (page == 1) {
    list.value = []
  }
  $http
    .get("/api/article", {
      page,
      size: pagination.value.size,
      topic: route.params.id,
    })
    .then((res) => {
      if (res.data.list?.length) {
        list.value = [...list.value, ...res.data.list];
        pagination.value.page = page;
        pagination.value.isMore = page * pagination.value.size < res.data.total;
      }
    })
    .finally(() => {
      pagination.value.loading = false;
    });
}
</script>
<style lang="scss" scoped>
.content-container {
  padding: 15px;
  background: #fff;

  .list {
    padding-top: 15px;

    .item {
      padding: 15px;
      padding-left: 30px;
      animation: fadeIn .3s forwards;
      padding-bottom: 30px;
      margin-bottom: 30px;
      border-bottom: 1px solid #eee;

      &.photo {
        padding-bottom: 0;
        margin-bottom: 0;
        border: none;
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

@media screen and (max-width:750px) {
  .list {
    .item {
      padding: 0 !important;
      padding-bottom: 30px !important;
    }
  }
}
</style>
