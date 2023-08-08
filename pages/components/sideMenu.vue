<template lang="pug">
.side-menu
  .active-box(:style="`transform:translateY(${activeIndex*50}px)`")
  .item(v-for='item in menuList' @click="eimts('update:modelValue',item.key)" :class="item.key==modelValue&&'active'")
    .label {{ item.label }}
</template>
<script setup>
const props = defineProps({
  'modelValue': {
    type: String,
    default: ""
  }
})
const eimts = defineEmits(['update:modelValue'])
const menuList = [
  {
    label: "home",
    key: ""
  },
  {
    label: "动态",
    key: "moment"
  },
  {
    label: "文章",
    key: "article"
  },
  {
    label: "相册",
    key: "photo"
  },
]

let activeIndex = computed(() => {
  return menuList.findIndex(item => item.key == props.modelValue)
})
</script>
<style lang='scss' scoped>
.side-menu {
  position: relative;
  position: sticky;
  top: 68px;

  .active-box {
    position: absolute;
    z-index: 1;
    top: 5px;
    left: 5px;
    width: calc(100% - 10px);
    height: 40px;
    background-color: var(--primary-color);
    border-radius: 8px;
    transition: all .3s;
  }

  .item {
    position: relative;
    z-index: 2;
    padding: 15px 30px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    user-select: none;
    text-align: center;
    transition: all .3s;

    &.active {
      color: #fff;
    }
  }
}
</style>