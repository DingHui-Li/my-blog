<template lang="pug">
.life-page
    .title 人生不过30000天，如白驹过隙，及时行乐
    .title 现在已经
        .num {{ (lifeDays / 365).toFixed(8) }}
        span 岁了
    .text 存在于世界上
    .detail
        .item {{ parseInt(lifeTime/(86400*365)) }} 
            .label 年
        .item {{ parseInt(lifeTime/86400/30) }} 
            .label 月
        .item {{ parseInt(lifeTime/86400) }} 
            .label 天
        .item {{ parseInt(lifeTime/3600) }} 
            .label 小时
        .item {{ parseInt(lifeTime/60) }} 
            .label 分钟
        .item {{ parseInt(lifeTime) }} 
            .label 秒
    .table(v-if='lifeDays')
        .cell(v-for="item in totalDays" :class="item<lifeDays&&'gone'")
</template>
<script setup>
const sysStore = useSysStore()

const totalDays = 365 * 80
const birthday = new Date(sysStore.globalSetting.profile.birthday)

let lifeTime = ref(0)//秒

let timer = setInterval(() => {
    lifeTime.value = (new Date().getTime() - birthday.getTime()) / 1000
}, 1000)

let lifeDays = computed(() => {
    return lifeTime.value / 86400
})

onBeforeUnmount(() => {
    clearInterval(timer)
})

</script>
<style lang='scss' scoped>
.life-page {
    height: 100%;
    background-color: #fff;
    padding: 30px;

    .title {
        font-size: 15px;
        color: #333;
        text-align: center;
        margin-bottom: 15px;

        .num {
            display: inline;
            font-size: 22px;
            font-weight: bold;
            color: #000;
            margin: 0 4px;
        }
    }

    .text {
        text-align: center;
        font-size: 12px;
        color: #999;
        margin-bottom: 10px;
        margin-top: 30px;
    }

    .table {
        white-space: wrap;
        font-size: 0;

        .cell {
            display: inline-block;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background-color: #e0e0e0;
            border-right: 1px solid #fff;
            border-bottom: 1px solid #fff;
            pointer-events: none;

            &.gone {
                background-color: #333;
                // border-color: #8BC34A;
            }
        }
    }

    .detail {
        max-width: 600px;
        margin: 0 auto;
        margin-bottom: 20px;
        border-radius: 20px;
        padding: 10px;
        box-shadow: inset 20px 20px 60px #bebebe,
            inset -20px -20px 60px #ffffff;

        .item {
            display: inline-block;
            width: 33.33%;
            text-align: center;
            box-sizing: border-box;
            padding: 20px 0;
            font-size: 15px;

            &:nth-child(1) {
                border-right: 1px solid #e0e0e090;
                border-bottom: 1px solid #e0e0e090;
            }

            &:nth-child(2) {
                border-right: 1px solid #e0e0e090;
                border-bottom: 1px solid #e0e0e090;
            }

            &:nth-child(3) {
                border-bottom: 1px solid #e0e0e090;
            }

            &:nth-child(4) {
                border-right: 1px solid #e0e0e090;
            }

            &:nth-child(5) {
                border-right: 1px solid #e0e0e090;
            }

            .label {
                font-size: 13px;
                color: #333;
            }
        }
    }
}
</style>