<template lang="pug">
.layout
  .topbar-container
    .topbar
      el-icon.menu(:size='20' @click='showSideMenu=!showSideMenu')
        Menu
      .host(@click="router.replace('/')") {{ website?.name }}
      .search(@click="router.push('/search')" v-if="route.name!='search'")
        .placeholder 搜索
        el-icon.icon
          Search
  .content-container(@click="showSideMenu=false")
    .side(:class="`${showSideMenu&&'show'}`")
      comSideMenu(v-model='type')
    .content 
      slot
  //- .footer-container
  //-   .footer
  //-     a(href='https://github.com/DingHui-Li/my-blog' target="_blank") github

</template>
<script setup>
import { storeToRefs } from 'pinia'
import { Search, Menu } from "@element-plus/icons-vue";
import comSideMenu from '@/pages/components/sideMenu.vue'
const router = useRouter();
const route = useRoute();
const { globalSetting } = storeToRefs(useSysStore())
const website = computed(() => globalSetting.value.website || {})

let showSideMenu = ref(false)
let type = ref('')
onMounted(() => {
  type.value = route.hash?.replace('#', '')
})
</script>
<style lang="scss" scoped>
$max-width: 900px;

.layout {
  width: 100%;
  min-height: 100vh;
  background: #dee0ed;

  &::before {
    content: '';
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-image: url(/bg.webp);
  }

  .topbar-container {
    position: sticky;
    top: 0;
    z-index: 9+1;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    width: 100%;
    border-bottom: 1px solid #eee;

    .topbar {
      z-index: 2;
      max-width: $max-width;
      height: 50px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;

      .menu {
        display: none;
      }

      .host {
        font-size: 20px;
        font-weight: bold;
        color: #263238;
        cursor: pointer;
      }

      .search {
        width: 100%;
        max-width: 150px;
        overflow: hidden;
        padding: 7px 10px;
        border-radius: 30px;
        background: var(--primary-color);
        display: flex;
        align-items: center;
        cursor: pointer;

        .placeholder {
          flex: 1;
          text-align: center;
          font-size: 14px;
          color: #fff;
        }

        .icon {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
        }

        &:active {
          filter: brightness(90%);
        }
      }
    }
  }

  .content-container {
    z-index: 1;
    width: 100%;
    max-width: $max-width;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;

    .side {
      position: relative;
      z-index: 9;
      background-color: #f5f5f5;
      padding-right: 5px;
      padding-left: 5px;
      padding-top: 15px;
    }

    .content {
      flex: 1;
      overflow: hidden;
    }
  }

  .footer-container {
    // border-top: 1px solid #000;
    // background: #ecf0f3;
    min-height: 100px;
    max-width: $max-width;
    background-color: #fff;
    margin: 0 auto;

    .footer {
      margin: 0 auto;
      max-width: $max-width;
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      text-align: center;

      a {
        color: var(--primary-color);
        text-decoration: none;
      }
    }
  }
}

@media screen and (max-width:750px) {
  .layout {
    .topbar-container {
      .topbar {
        display: flex;
        justify-content: space-between;

        .menu {
          display: block !important;
          padding: 10px;
        }

        .host {
          margin-left: 80px;
        }

        .search {
          width: 80px !important;
        }
      }
    }

    .content-container {
      .side {
        position: fixed;
        z-index: 99;
        height: calc(100vh - 50px);
        width: 50vw;
        background: rgba(255, 255, 255, 1);
        // backdrop-filter: blur(5px);
        transform: translateX(-100%);
        transition: all .3s;
        opacity: 0;
        box-shadow: 0 10px 10px 5px rgba(0, 0, 0, 0.1);

        &.show {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
  }
}
</style>
