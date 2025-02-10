<template>
  <div class="user-portrait" v-loading="analyMyBlog.loading">
    <div class="info">
      以下内容由<span>{{ analyMyBlog.model }}</span>分析全站数据得出,仅供参考.
      <div>更新于 <span>{{ new Date(analyMyBlog.time).toLocaleString() }}</span>(每月1号更新) </div>
    </div>
    <div class="content" v-html="analyMyBlog.content"></div>
  </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { analyMyBlog } = storeToRefs(useSysStore())
useSysStore().checkedAnalyMyBlog()

</script>
<style lang="scss" scoped>
.user-portrait {
  padding: 15px;
  padding-left: 30px;
  box-sizing: border-box;
  overflow: auto;
  padding-bottom: 200px;

  .info {
    padding: 10px;
    background-color: #f5f5f5;
    margin-bottom: 15px;
    font-size: 14px;

    span {
      color: var(--primary-color);
      margin: 0 4px;
    }

    div {
      // text-align: right;
      margin-top: 4px;
    }
  }

  &:deep(.content) {
    h3 {
      margin-bottom: 10px;
    }

    ol,
    ul {
      margin-top: 15px;
      margin-bottom: 15px;

      li {
        margin-bottom: 10px;
      }
    }

    p {
      margin: 5px 0;
    }

    hr {
      margin-bottom: 15px;
    }
  }
}
</style>