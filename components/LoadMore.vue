<template lang="pug">
.load-more(@click="loadMore") {{ loading?'加载中':hasMore?"加载更多":"没有更多了" }}
</template>
<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    hasMore: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['loadMore'])

function loadMore() {
    if (!props.loading && props.hasMore) {
        emits('loadMore')
    }
}
</script>
<style lang="scss" scoped>
.load-more {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    // color: var(--primary-color);
    color: #333;
    font-style: oblique;
    margin-top: 10px;
    cursor: pointer;
    user-select: none;

    &:active {
        opacity: 0.8;
    }
}
</style>