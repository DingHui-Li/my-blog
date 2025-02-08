<template>
  <div class="ai-reply" v-if="props.data?.content">
    <div class="model">{{ props.data.model }}: </div>
    <div class="msg">{{ props.data.content }}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ data: Object })

</script>
<style lang="scss" scoped>
.ai-reply {
  background-color: #f5f5f5;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
  color: #333;

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