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
