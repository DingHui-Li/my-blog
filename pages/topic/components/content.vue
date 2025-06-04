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
const $emits = defineEmits(["dataChange"])

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
        if (page == 1) {
          //找出第一页的所有电影封面或者图片,合成头部封面图
          let imgs = res.data.list?.map(item => {
            if (item?.movie?.cover) {
              return [item?.movie?.cover + '?x-oss-process=image/resize,m_mfit,w_200']
            } else if (item.cover) {
              return [item.cover + '?x-oss-process=image/resize,m_mfit,w_200']
            } else {
              return item.imgs.map(img => img + '?x-oss-process=image/resize,m_mfit,w_200')
            }
          })
          $emits('dataChange', {
            total: res.data.total, imgs: imgs.reduce((imgs, arr) => {
              return imgs.concat(arr)
            }, [])
          })
        }
      }
    })
    .finally(() => {
      pagination.value.loading = false;
    });
}
</script>
<style lang="scss" scoped>
.content-container {
  // background: #fff;
  padding: 15px;
  padding-top: 0;

  .list {
    // padding-top: 15px;

    .item {
      padding: 15px;
      animation: fadeIn .3s forwards;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 10px;
      background-color: #fff;

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

@media screen and (max-width:1080px) {
  .content-container {
    // background: #fff;
    padding: 10px;
    padding-top: 0;
  }
}
</style>
