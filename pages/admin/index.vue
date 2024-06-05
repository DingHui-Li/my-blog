<template lang="pug">
.admin
</template>
<script setup>
definePageMeta({
  keepalive: true
})
const router = useRouter();
onMounted(() => {
  router.replace("/admin/article");
})
</script>
<style lang="scss" scoped>
.admin {}
</style>
