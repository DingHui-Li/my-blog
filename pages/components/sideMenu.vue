<template lang="pug">
.side-menu
  .active-box(:style="`transform:translateY(${activeIndex*51}px)`")
  .item(v-for='item in menuList' @click="handleClick(item)" :class="item.key==modelValue&&'active'")
    .label {{ item.label }}
  .website-info
    a(href='https://github.com/DingHui-Li/my-blog' target="_blank") Github
    div(style="margin-top:10px")
      el-switch(v-model="isLightTheme" width="50" inline-prompt active-text="黑暗" inactive-text="明亮"  style="--el-switch-on-color: #000;")
</template>
<script setup>
import { storeToRefs } from 'pinia'

const props = defineProps({
  'modelValue': {
    type: String,
    default: ""
  }
})
const router = useRouter()
const eimts = defineEmits(['update:modelValue'])
const sysStore = useSysStore()
const { sideMenu: menuList, theme } = storeToRefs(sysStore)
const isLightTheme = ref(true)

let activeIndex = computed(() => {
  return menuList.value.findIndex(item => item.key == props.modelValue)
})

function handleClick(item) {
  eimts('update:modelValue', item.key)
  if (item.path) {
    router.push('/' + item.path + '#' + item.key)
  } else {
    router.replace('/#' + item.key)
  }
}

watch(theme, v => {
  isLightTheme.value = v == 'light'
}, {
  immediate: true
})

watch(isLightTheme, (v) => {
  sysStore.changeTheme(v ? 'light' : 'dark')
  if (process.client) {
    if (v) {
      DarkReader.disable();
    } else {
      DarkReader.setFetchMethod(window.fetch)
      DarkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 10
      });
    }
  }
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
    height: 21px;
    padding: 15px 30px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    user-select: none;
    text-align: center;
    transition: all .3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
      color: #fff;
    }
  }
}

.website-info {
  border-top: 1px solid #eeeeee;
  padding-top: 15px;
  margin-top: 100px;
  text-align: center;

  a {
    font-weight: bold;
    color: var(--primary-color);
    text-decoration: none;
  }
}
</style>