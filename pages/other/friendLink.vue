<template>
  <div class="friend-link-page">
    <div class="box" v-for="item in 20">
      <div>标题</div>
      <div class="link">https://link.cn</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const list = [
  {
    title: '测试网站',
    link: "https://link.cn"
  }
]
</script>
<style lang="scss" scoped>
.friend-link-page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  background: linear-gradient(to top, transparent, var(--primary-color));

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background: linear-gradient(to top, transparent, var(--primary-color));
  // }

  .box {
    position: relative;
    z-index: 2;
    width: 33.33%;
    aspect-ratio: 1;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    overflow: hidden;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      transform: scale(1.4);
    }

    &:nth-child(2n) {
      background-color: #fff;
    }

    .link {
      font-size: 15px;
    }
  }
}
</style>