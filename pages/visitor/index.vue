<template lang="pug">
.visitor-page 
    .title 访问记录
    comEarth
    .list
        .item(v-for='item in list')
            .col.ip {{ item.ip }}
                div {{ item.location }}
            .col.url {{ item.url }}
            .col.time {{ moment(item.time).calendar() }}
                div {{ moment(item.time).format('YYYY-MM-DD HH:mm:ss') }}
</template>
<script setup>
import comEarth from './components/earth.vue'
import $http from "@/utils/http.js";
import moment from "moment";

let list = ref([])
getList()
let timer = setInterval(() => {
    getList()
}, 5000);

function getList() {
    $http.get('/api/log?type=client', { size: 100 }).then(res => {
        list.value = res?.data?.list
    })
}
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

    .list {
        background-color: #333;
        padding: 15px;
        padding-bottom: 1px;
        border-radius: 10px;
        margin-top: 15px;

        .item {
            display: flex;
            color: #fff;
            font-size: 12px;
            margin-bottom: 30px;

            div {
                min-width: 40px;
                margin-right: 10px;
            }

            .col {
                flex: 1;
            }

            .ip {
                width: 120px;
            }

            .url {
                width: 100px;
                word-break: break-all;
            }

            .time {
                white-space: nowrap;
                width: 140px;
            }

            .ua {
                flex: 1;
                overflow: hidden;
            }
        }
    }
}
</style>