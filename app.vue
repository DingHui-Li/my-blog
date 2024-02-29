<template lang="pug">
NuxtLayout(:name="layout")
  NuxtPage
</template>
<script setup>
import "./utils/momentCh.js";
import "@/style/reset.css";
import "@/style/color.css";
import '@/style/iconfont.css';
const route = useRoute();
const store = useSysStore()
store.getData()

let layout = computed(() => {
  let routeName = route.name;
  if (routeName.includes('admin')) {
    return 'admin'
  }
  if (routeName.includes('inappwebview')) {
    return 'none'
  }
  return 'default'
})

watch(() => route.fullPath, (v) => {
  console.log(route)
  window.scrollTo(0, 0)
})
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  /* filter: blur(1rem); */
  transform: scale(0.9);
  border-radius: 30px;
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
