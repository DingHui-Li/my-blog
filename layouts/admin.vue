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
  {
    title: "Log",
    path: "/admin/log",
  },
];

</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #dee0ed;
  display: flex;
  flex-direction: column;

  .topbar-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    z-index: 9;
    background: #ffffff90;
    height: 50px;

    .menu {
      display: none;
      padding: 15px;
    }
  }

  .content-container {
    height: 100%;
    overflow: hidden;
    flex: 1;
    display: flex;

    .sidebar {
      width: 200px;
      height: 100%;
      background: #fff;
      border-right: 2px solid #eee;
    }

    .content {
      flex: 1;
      height: 100%;
      overflow: auto;
    }
  }
}

@media screen and (max-width:750px) {
  .layout {
    .topbar-container {
      .menu {
        display: block;
        padding: 10px;
      }
    }

    .content-container {
      .sidebar {
        position: fixed;
        z-index: 99;
        background: #ffffff;
        transition: all .3s;
        transform: translateX(-100%);
        opacity: 0;
        box-shadow: 0 10px 10px 5px rgba(0, 0, 0, 0.1);
        border: none;

        &.show {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
  }
}
</style>
