<template>
  <div class="ai-reply" v-if="props.data?.content">
    <span style="" :class="`icon iconfont icon-bxs-bot`"></span>:
    <!-- <div class="model">{{ props.data.model }}: </div> -->
    <div class="msg">{{ props.data.content }}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ data: Object })

</script>
<style lang="scss" scoped>
.ai-reply {
  position: relative;
  background-color: #f5f5f5;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
  color: #333;
  opacity: 0.8;
  pointer-events: none;
  margin-left: 15px;

  &::before {
    content: '';
    position: absolute;
    left: -16px;
    top: 8px;
    border: 8px solid transparent;
    border-right-color: #f5f5f5;
    opacity: 0.8;
  }

  .model {
    display: inline;
    font-size: 13px;
    color: var(--primary-color);
  }

  .msg {
    display: inline;
    font-size: 13px;
    font-weight: normal;
  }
}
</style>