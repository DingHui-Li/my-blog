<template lang="pug">
.visitor-page 
    .title 访问记录
    comEarth
</template>
<script setup>
import comEarth from './components/earth.vue'
</script>
<style lang='scss' scoped>
.visitor-page {
    height: 100%;
    background-color: #fff;
    padding: 30px;

    .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
    }
}
</style>