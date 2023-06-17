<template lang="pug">
.admin
  h1 admin
</template>
<script setup>
definePageMeta({
  middleware: ["auth"],
});
const router = useRouter();
router.replace("/admin/article");
</script>
<style lang="scss" scoped>
.admin {
}
</style>
