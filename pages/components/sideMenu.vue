<template>
  <div class="side-menu">
    <div class="active-box" :style="`transform:translateY(${activeIndex * 51}px)`"></div>
    <div class="list">
      <div class="item" v-for="item in menuList" @click="handleClick(item)" :class="item.key == modelValue && 'active'">
        <div class="label">{{ item.label }}</div>
      </div>
    </div>
    <div class="website-info">
      <a href="https://github.com/DingHui-Li/my-blog" target="_blank">源码</a>
      <div style="margin:10px">
        <el-switch v-model="isLightTheme" width="50" inline-prompt="inline-prompt" active-text="黑暗" inactive-text="明亮"
          style="--el-switch-on-color: #000;">
        </el-switch>
      </div>
      <el-color-picker v-model="themeColor" show-alpha :predefine="predefineColors" />
    </div>
    <div class="beian"><a href="https://beian.miit.gov.cn" target="_blank">{{ beian }}</a></div>
  </div>
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
const { sideMenu: menuList, theme, beian, themeColor } = storeToRefs(sysStore)
const isLightTheme = ref(true)
const predefineColors = ref([
  '#D32F2F',
  '#FF4081',
  '#7B1FA2',
  '#7C4DFF',
  '#3f51b5',
  '#1976D2',
  '#2196F3',
  '#0097A7',
  '#009688',
  '#388E3C',
  '#8BC34A',
  '#AFB42B',
  '#FFEB3B',
  '#F57C00',
  '#FFC107',
  '#E64A19',
  '#795548',
  '#616161',
  '#607D8B'
])

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
watch(themeColor, v => {
  sysStore.changeThemeColor(v)
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
  z-index: 9;
  position: sticky;
  padding-bottom: 30px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

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

  .list {
    flex: 1;

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
}

.website-info {
  border-top: 1px solid #eeeeee;
  padding-top: 15px;
  // margin-top: 100px;
  text-align: center;

  a {
    font-weight: bold;
    color: var(--primary-color);
    text-decoration: none;
    font-size: 14px;
  }
}

.beian {
  font-size: 12px;
  word-break: break-all;
  margin-top: 15px;
  border-top: 1px solid #eeeeee;
  padding: 15px;

  a {
    color: #333;
  }
}

@media screen and (max-width:750px) {
  .beian {
    opacity: 0;
    pointer-events: none;
  }
}
</style>