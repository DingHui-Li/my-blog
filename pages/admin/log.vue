<template lang="pug">
.log-page
    .title 访问日志
    .list
        .item(v-for='item in list')
            .col.ip {{ item.ip }}
                el-tag(size='small' type="success" v-if='item.login') 已登录
                div {{ item.location }}
            .col.url {{ item.url }}
            .col 
                el-tag(size='small') {{ item.ua?.system }}-{{ item.ua?.browser }}
            .col.time {{ moment(item.time).calendar() }}
                div {{ moment(item.time).format('YYYY-MM-DD HH:mm:ss') }}
</template>
<script setup>
import $http from "@/utils/http.js";
import moment from "moment";
import UA from 'browser-tool'

let list = ref([])

getList()
let timer = setInterval(() => {
    getList()
}, 5000);

function getList() {
    $http.get('/api/log', { size: 100, login: false }).then(res => {
        res.data.list.forEach(item => {
            if (item.ua) {
                item.ua = UA.parse(item.ua)
            }
        })
        list.value = res?.data?.list
    })
}
onBeforeUnmount(() => {
    clearInterval(timer)
})
</script>
<style lang='scss' scoped>
.log-page {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 15px;
    background-color: #fff;

    .list {
        background-color: #333;
        padding: 15px;
        padding-bottom: 1px;
        border-radius: 10px;
        margin-top: 15px;

        .item {
            width: 100%;
            display: flex;
            color: #fff;
            font-size: 12px;
            margin-bottom: 30px;
            overflow: auto;

            div {
                min-width: 40px;
                margin-right: 10px;
            }

            .col {
                flex: 1;
                overflow: hidden;
                min-width: 100px;
            }

            .ip {
                width: 120px;
            }

            .url {
                width: 100px;
                word-break: break-all;
            }

            .time {
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