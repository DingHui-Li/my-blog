<template lang="pug">
.load-more(ref='loadingEl' @click="loadMore") {{ loading?'加载中':hasMore?"点击加载更多":"没有更多了" }}
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
const loadingEl = ref(null)
const emits = defineEmits(['loadMore'])

onMounted(() => {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio > 0) {
            loadMore()
        }
    })
    observer.observe(loadingEl.value)
})

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
    color: #444;
    font-style: oblique;
    margin-top: 10px;
    cursor: pointer;
    user-select: none;

    &:active {
        opacity: 0.8;
    }
}
</style>