<template lang="pug">
.admin
</template>
<script setup>
const router = useRouter();
onMounted(() => {
  router.replace("/admin/article");
})
</script>
<style lang="scss" scoped>
.admin {}
</style>
