<template lang="pug">
.topics
  .title 选择主题（多选）
  .list
    .item(v-for="item in topics" @click="handleSelect(item)")
      img.bg(:src='`${item.cover}?x-oss-process=image/resize,m_mfit,w_500`')
      .name {{ item.name }}
      el-icon.selected(v-if="selected[item._id]")
        SuccessFilled
      el-icon.selected(v-else style="color:#fff")
        CircleCheck
</template>
<script setup>
import $http from "@/utils/http.js";
import { SuccessFilled, CircleCheck } from "@element-plus/icons-vue";

const emits = defineEmits(["selected"]);

const selected = ref({});
let topics = ref([]);
getTopicList();

function getTopicList() {
  $http.get("/api/topic").then((res) => {
    topics.value = res?.data;
  });
}

function handleSelect(topic) {
  selected.value[topic._id] = !selected.value[topic._id];
  emits("selected", selected.value);
}
</script>
<style lang="scss" scoped>
.topics {
  .title {
    font-size: 12px;
    color: #333;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .list {
    display: flex;
    flex-wrap: wrap;

    .item {
      position: relative;
      width: 100px;
      aspect-ratio: 9/16;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        &::after {
          background: rgba(0, 0, 0, 0.8);
        }
      }

      &::after {
        content: "";
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        transition: all 0.3s;
      }

      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .name {
        position: relative;
        z-index: 2;
        font-size: 25px;
        color: #fff;
        font-weight: bold;
      }

      .selected {
        position: absolute;
        z-index: 3;
        top: 5px;
        right: 5px;
        color: orangered;
        font-size: 20px;
      }
    }
  }
}
</style>
