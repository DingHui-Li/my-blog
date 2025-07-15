<template>
  <div class="other-page">
    <div class="list">
      <div class="item" v-for="item in list" @click="jump(item.path)">
        <span :style="`color:${item.color}`" :class="`icon iconfont icon-${item.icon}`"></span>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();

const list = [
  {
    name: "浮生",
    icon: "life-solid",
    color: "#4CAF50",
    path: "/other/life",
  },
  {
    name: "榜单",
    icon: "bangdan",
    color: "#FFEB3B",
    path: "/other/statist",
  },
  {
    name: "所有话题",
    icon: "topic",
    color: "#3F51B5",
    path: "/topic",
  },
  // {
  //   name: "访客",
  //   icon: "fangkeshu",
  //   color: "#2196F3",
  //   path: "/other/visitor",
  // },
  {
    name: "后台管理",
    icon: "manage",
    color: "#607D8B",
    path: "/admin",
  },
  {
    name: "关于",
    icon: "about-o",
    color: "#F44336",
    path: "/about",
  },
];

function jump(path: String) {
  if (path.includes("/admin")) {
    navigateTo({ path: "/admin" });
  } else {
    router.push(path + "#other");
  }
}
</script>
<style lang="scss" scoped>
.other-page {
  height: 100%;
  background-color: #fff;
  padding: 30px;
  box-sizing: border-box;

  .list {
    .item {
      display: inline-block;
      text-align: center;
      padding: 15px;
      width: 33.33%;
      box-sizing: border-box;
      transition: all 0.3s;
      cursor: pointer;

      .icon {
        font-size: 30px;
      }

      .name {
        font-size: 13px;
        margin-top: 4px;
        color: #333;
      }

      &:hover {
        background-color: #e0e0e060;
      }
    }
  }
}
</style>
