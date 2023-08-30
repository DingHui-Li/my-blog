<template lang="pug">
.log-page
    .title 请求日志
    .list
        .item(v-for='item in list')
            div {{ item.id }}
            div {{ item.platform }}
            div {{ item.url }}
            div {{ moment(item.time).fromNow() }}
</template>
<script setup>
import $http from "@/utils/http.js";
import moment from "moment";

let list = ref([])

getList()
let timer = setInterval(() => {
    getList()
}, 5000);

function getList() {
    $http.get('/api/log').then(res => {
        console.log(res)
        list.value = res?.data?.list
    })
}
onBeforeUnmount(() => {
    clearInterval(timer)
})
</script>
<style lang='scss' scoped>
.log-page {
    .list {
        background-color: #333;
        padding: 15px;
        padding-bottom: 1px;
        border-radius: 5px;
        margin-top: 15px;

        .item {
            display: flex;
            color: #fff;
            font-size: 12px;
            margin-bottom: 15px;

            div {
                margin-right: 10px;
            }
        }
    }
}
</style>