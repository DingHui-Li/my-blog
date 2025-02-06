<template>
  <div v-if="data.imgs.length">
    <!-- <div class="year" v-if="showYear">{{ createTime.getFullYear()
      }}年</div> -->
    <div class="moment-item">
      <!-- <div class="month"><span v-if="showMonth">{{ createTime.getMonth() + 1 }}月</span>
      </div> -->
      <div class="date">
        <div>
          {{ createTime.format('dd') }}
          <div class="month">{{ createTime.getMonth() + 1 }}月</div>
        </div>
        <div class="year">{{ createTime.getFullYear() }}</div>
        <div class="location" v-if="data?.location">
          <span v-if="data.location.city">
            {{ data.location.city }} ·
          </span>
          {{ data.location.name || data.location }}
        </div>
      </div>
      <div class="right">
        <div class="topics">
          <TopicTag v-for="item in data.topics" :data="item"></TopicTag>
        </div>
        <div class="imgs" @click="router.push('/article/' + data._id + '#photo')">
          <div class="img" v-for="(item, index) in data.imgs"><img
              :src="item + '?x-oss-process=image/resize,m_mfit,w_400'" /></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import moment from "moment";
import TopicTag from "./topicTag.vue";
import { Article } from "~/types";

const router = useRouter();
const props = defineProps<{ data: Article }>();
const { globalSetting } = storeToRefs(useSysStore())
const profile = computed(() => globalSetting.value.profile || {})
let createTime = computed(() => new Date(Number(props.data.createTime)))

</script>
<style lang='scss' scoped>
.moment-item {
  margin-bottom: 0;
  display: flex;

  .date {
    width: 100px;
    font-size: 25px;
    font-weight: bold;

    .month {
      position: relative;
      font-weight: normal;
      display: inline;
      font-size: 12px;
      left: -4px;
    }

    .year {
      font-size: 22px;
    }

    .location {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      font-weight: normal;
    }
  }

  .right {
    flex: 1;
    overflow: hidden;

    .imgs {
      position: relative;
      margin-top: 10px;
      padding-bottom: 30px;
      cursor: pointer;
      font-size: 0;

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
        margin-bottom: 1px;
        // border-radius: 10px;

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