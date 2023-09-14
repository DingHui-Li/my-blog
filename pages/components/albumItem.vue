<template lang="pug">
div(v-if='data.imgs.length')
  .year(v-if='showYear') {{ updateTime.getFullYear() }}年
  .moment-item
    .month
      span(v-if="showMonth") {{ updateTime.getMonth()+1 }}月
    .right
      .info
        .time {{updateTime.getDate()}}日
      .topics
        TopicTag(v-for='item in data.topics' :data='item')
      .imgs(@click="router.push('/article/'+data._id)")
        .img(v-for='(item,index) in data.imgs')
          img(:src='item+"?x-oss-process=image/resize,m_fill,w_400"')
</template>
<script setup>
import moment from "moment";
import TopicTag from "./topicTag.vue";

const router = useRouter();
const props = defineProps({
  data: Object,
  showMonth: {
    type: Boolean,
    default: false
  },
  showYear: {
    type: Boolean,
    default: false
  }
});
const sys = useSysStore()
let profile = sys.globalSetting.profile
let updateTime = computed(() => new Date(props.data?.updateTime))

</script>
<style lang='scss' scoped>
.year {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.moment-item {
  margin-bottom: 0;
  display: flex;

  .month {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    width: 90px;
  }

  .right {
    flex: 1;
    overflow: hidden;

    .info {

      .title {
        font-size: 14px;
        color: #3f51b5;
        word-break: break-all;
        font-weight: bold;
        color: 3f51b5;

        span {
          font-size: 12px;
          color: #333;
          margin-left: 5px;
        }
      }

      .time {
        font-size: 20px;
        color: #333;
      }
    }

    .imgs {
      position: relative;
      margin-top: 10px;
      padding-bottom: 30px;
      cursor: pointer;

      // &:hover {
      //   .img {
      //     transform: scale(1.06);
      //   }
      // }

      .img {
        top: 0;
        width: calc(50% - 1px);
        max-width: 150px;
        aspect-ratio: 1;
        // border-radius: 8px;
        overflow: hidden;
        transition: all .3s;
        transform-origin: 0 0;
        display: inline-block;
        margin-right: 1px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>