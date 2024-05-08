<template>
    <div class="article-content" ref="editorEl">
        <RichEditor v-if="detail._id" :value="detail.htmlContent" readonly />
    </div>
</template>
<script setup>
import $http from "@/utils/http.js";

const route = useRoute();
const editorEl = ref()
let detail = ref({});
onMounted(() => {
    getArticle();
    setTimeout(() => {
        let rect = editorEl.value.getBoundingClientRect()
        window.flutter_inappwebview.callHandler('clientHeight', rect.height);
    }, 1000)
})

function getArticle() {
    $http.get(`/api/article/${route.query.id}`).then((res) => {
        detail.value = res?.data;
        nextTick(() => {
            setTimeout(() => {
                addContentImgEvent();
            }, 1000);
        })
    });
}

function addContentImgEvent() {
    let imgs = editorEl.value.getElementsByClassName("content-img");
    console.log(imgs)
    for (let index = 0; index < imgs.length; index++) {
        let img = imgs[index];
        img.addEventListener("click", (e) => {
            window.flutter_inappwebview.callHandler('previewImg', e.target.currentSrc);
        });
    }
}
</script>
<style lang='scss' scoped>
.article-content {
    height: fit-content;
    overflow: hidden;
}

.img-preview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    z-index: 99;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
    padding: 50px;

    img {
        width: 70%;
        height: auto;
    }
}
</style>