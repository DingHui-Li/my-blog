<template lang="pug">
.layout
  .topbar-container
    el-icon.menu(:size='20' @click='showSideMenu=!showSideMenu')
      Menu
  .content-container(@click="showSideMenu=false")
    .sidebar(:class="`${showSideMenu&&'show'}`")
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
import { Menu } from "@element-plus/icons-vue";

let showSideMenu = ref(false)
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    z-index: 9;
    background: #ffffff90;
    backdrop-filter: blur(5px);
    height: 50px;

    .menu {
      display: none;
      padding: 15px;
    }
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

@media screen and (max-width:1080px) {
  .layout {
    .topbar-container {
      .menu {
        display: block;
      }
    }

    .content-container {
      .sidebar {
        position: fixed;
        z-index: 9;
        background: #ffffff90;
        backdrop-filter: blur(5px);
        transition: all .3s;
        transform: translateX(-100%);
        opacity: 0;

        &.show {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
  }
}
</style>
