<template lang="pug">
NuxtLayout(:name="route.name.includes('admin')?'admin':route.name.includes('inappwebview')?'none':'default'")
  NuxtPage
</template>
<script setup>
import "./utils/momentCh.js";
import "@/style/reset.css";
import "@/style/color.css";
const route = useRoute();
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
</style>
