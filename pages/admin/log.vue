<template lang="pug">
.log-page
    .title 访问日志
    .list
        .item(v-for='item in list')
            .ip {{ item.ip }}
            .url {{ item.url }}
            .time {{ moment(item.time).calendar() }}
                div {{ moment(item.time).format('YYYY-MM-DD HH:mm:ss') }}
            .ua {{ item.ua }}
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
    $http.get('/api/log', { size: 100 }).then(res => {
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