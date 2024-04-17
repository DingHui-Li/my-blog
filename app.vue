<template lang="pug">
NuxtLayout(:name="layout")
  NuxtPage(v-if="route.name.includes('webview')")
  NuxtPage(v-else keep-alive style="position:absolute;width:100%;height:100%")
</template>
<script setup>
import "./utils/momentCh.js";
import "@/style/reset.css";
import "@/style/color.css";
import '@/style/iconfont.css';
import '@/utils/util'
const route = useRoute();
const store = useSysStore()
store.getData()

let layout = computed(() => {
  let routeName = route.name;
  if (routeName.includes('webview') || routeName.includes('login')) {
    return 'none'
  }
  if (routeName.includes('admin')) {
    return 'admin'
  }
  return 'default'
})

watch(() => route.fullPath, (v) => {
  console.log(route)
})

onMounted(() => {
  store.setToken(window.localStorage['token'] || "")
})
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all .3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  /* transform: scale(0.9); */
  transform: translateY(20px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  /* transform: scale(1); */
  transform: translateY(0);
}

@font-face {
  font-family: 'HarmonyOS_Sans_SC_Regular';
  font-weight: normal;
  src: url('/public/HarmonyOS_Sans_SC_Regular.woff2') format('truetype');
}

* {
  font-family: HarmonyOS_Sans_SC_Regular !important;
}
</style>
