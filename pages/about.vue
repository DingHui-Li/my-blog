<template>
    <div class="about-page">
        <h2>关于我</h2>
        <div class="content" v-if="aboutmeArticle?._id">
            <RichEditor :value="(aboutmeArticle?.htmlContent)?.toString()" readonly />
        </div>
        <div class="divider"></div>
        <h2>关于本站</h2>
        <div class="content" v-if="aboutArticle?._id">
            <RichEditor :value="(aboutArticle?.htmlContent)?.toString()" readonly />
        </div>
    </div>
</template>
<script setup lang="ts">
import $http from "@/utils/http.js";
import { Article } from "~/types";

const website = useSysStore().globalSetting.website
const aboutmeArticle = ref<Article>()
const aboutArticle = ref<Article>()

if (website.about) {
    $http.get(`/api/article/${website.about}`).then(res => {
        aboutArticle.value = res.data
    })
}
if (website.aboutme) {
    $http.get(`/api/article/${website.aboutme}`).then(res => {
        aboutmeArticle.value = res.data
    })
}
</script>
<style lang='scss' scoped>
.about-page {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 15px;
    box-sizing: border-box;

    h2 {
        margin-top: 30px;
        margin-bottom: 10px;
    }

    .content {
        font-size: 15px;
        line-height: 22px;
    }

    .divider {
        width: 100%;
        height: 1px;
        background-color: #eee;
        margin-top: 30px;
    }
}
</style>