<template lang="pug">
.content-container
  .list
    .item(:class="item.type" v-for="(item,index) in list" :key='item._id' :style="`animation-delay:${index%10*100}ms`")
      comMomentItem(v-if='item.type=="moment"' :data='item')
      comAlbumItem(v-else-if='item.type=="photo"' :showMonth='true' :data='item')
      comArticleItem(v-else :data='item')
    .empty(v-if="!list.length&!pagation.loading") 无数据
</template>
<script setup>
const router = useRouter();
import $http from "@/utils/http.js";
import comArticleItem from '../../components/articleItem'
import comMomentItem from '../../components/momentItem'
import comAlbumItem from '../../components/albumItem'

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
  if (page == 1) {
    list.value = []
  }
  $http
    .get("/api/article", {
      page,
      size: pagation.value.size,
      topic: route.params.id,
    })
    .then((res) => {
      if (res.data.list?.length) {
        list.value = [...list.value, ...res.data.list];
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
</style>
