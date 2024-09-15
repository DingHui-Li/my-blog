<template lang="pug">
.visitor-page 
    .title 访问记录
    comEarth
    .time 更新时间 {{ updateTime.format('yyyy-MM-dd hh:mm:ss') }}
    .list
        .item(v-for='item in list')
            .col.ip {{ item.ip }}
                el-tag(size='small' v-if='item.login') 已登录
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
let updateTime = ref(new Date())
getList()
let timer = setInterval(() => {
    getList()
}, 1000 * 30);
onUnmounted(() => {
    clearInterval(timer)
})

function getList() {
    updateTime.value = new Date()
    $http.get('/api/log?type=client', { size: 100 }).then(res => {
        list.value = res?.data?.list
    })
}
</script>
<style lang='scss' scoped>
.visitor-page {
    height: 100%;
    overflow: auto;
    background-color: #fff;
    padding: 30px;
    box-sizing: border-box;

    .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .time {
        text-align: right;
        font-size: 12px;
        color: #999;
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