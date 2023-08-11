<template lang="pug">
.layout
  .topbar-container
  .content-container
    .sidebar
      el-menu
        el-menu-item(v-for="(item) in  menuList" 
          :index="item.path" 
          @click="router.replace(item.path)")
          span {{item.title}}
    .content
      slot
</template>
<script setup>
const router = useRouter();

const menuList = [
  {
    title: "文章管理",
    path: "/admin/article",
  },
  {
    title: "标签管理",
    path: "/admin/topic",
  },
  {
    title: "全局配置",
    path: "/admin/setting",
  },
];
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  min-height: 100vh;
  background: #dee0ed;

  .topbar-container {
    position: sticky;
    top: 0;
    z-index: 9;
    background: #ffffff90;
    backdrop-filter: blur(5px);
    height: 50px;
  }

  .content-container {
    display: flex;

    .sidebar {
      position: sticky;
      top: 50px;
      width: 200px;
      height: 90vh;
      background: #fff;
      border-right: 2px solid #eee;
    }

    .content {
      flex: 1;
      overflow: hidden;
      padding: 15px;
      background: #fff;
    }
  }
}
</style>
