<template>
    <div class="about-page">
        <!-- <h2>关于我</h2> -->
        <!-- <div class="content" v-if="aboutmeArticle?._id">
            <RichEditor :value="(aboutmeArticle?.htmlContent)?.toString()" readonly />
        </div> -->
        <div class="content" v-html="analyMyBlog.content" style="margin-left: 20px;"></div>
        <div class="time">更新于 <span>{{ new Date(analyMyBlog.time).toLocaleString() }}</span>(每月1号更新) </div>
        <!-- <div class="divider"></div>
        <h2>关于本站</h2>
        <div class="content" v-if="aboutArticle?._id">
            <RichEditor :value="(aboutArticle?.htmlContent)?.toString()" readonly />
        </div> -->
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import $http from "@/utils/http.js";
import { type Article } from "~/types";

const { globalSetting, analyMyBlog } = storeToRefs(useSysStore())
const website = computed(() => globalSetting.value.website || {})

useSysStore().checkedAnalyMyBlog()
const aboutmeArticle = ref<Article>()
const aboutArticle = ref<Article>()

watch(() => website, () => {
    if (website.value.about) {
        $http.get(`/api/article/${website.value.about}`).then(res => {
            aboutArticle.value = res.data
        })
    }
    if (website.value.aboutme) {
        $http.get(`/api/article/${website.value.aboutme}`).then(res => {
            aboutmeArticle.value = res.data
        })
    }
}, { deep: true, immediate: true })

</script>
<style lang='scss' scoped>
.about-page {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 15px;
    box-sizing: border-box;
    overflow: auto;
    padding-bottom: 150px;

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

    .time {
        font-size: 12px;
        text-align: right;
        margin-top: 30px;
        color: #999;
    }

    &:deep(.content) {
        h3 {
            margin-bottom: 10px;
        }

        ol,
        ul {
            margin-top: 15px;
            margin-bottom: 15px;

            li {
                margin-bottom: 10px;
            }
        }

        p {
            margin: 5px 0;
        }

        hr {
            margin-bottom: 15px;
        }
    }
}
</style>