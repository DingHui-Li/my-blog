<template>
    <div class="other-page">
        <div class="list">
            <div class="item" v-for="item in list" @click="jump(item.path)">
                <span :class="`icon iconfont icon-${item.icon}`"></span>
                <div class="name">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const router = useRouter()

const list = [
    {
        name: '人生',
        icon: 'dianzhentu',
        path: '/other/life'
    },
    {
        name: '访客',
        icon: 'diqiu',
        path: '/other/visitor'
    }
]

function jump(path: String) {
    router.push(path + '#other')
}
</script>
<style lang='scss' scoped>
.other-page {
    height: 100%;
    background-color: #fff;
    padding: 30px;

    .list {
        .item {
            display: inline-block;
            text-align: center;
            padding: 15px;
            width: 33.33%;
            box-sizing: border-box;
            transition: all .3s;
            cursor: pointer;

            .icon {
                font-size: 40px;
            }

            .name {
                font-size: 14px;
            }

            &:hover {
                background-color: #e0e0e060;
            }
        }
    }
}
</style>