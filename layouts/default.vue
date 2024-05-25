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
      slot()
  .footer-container
    .footer
      a(href='https://beian.miit.gov.cn' target="_blank") {{ beian }}

</template>
<script setup>
import { storeToRefs } from 'pinia'
import { Search, Menu } from "@element-plus/icons-vue";
import comSideMenu from '@/pages/components/sideMenu.vue'
const router = useRouter();
const route = useRoute();
const { globalSetting, beian } = storeToRefs(useSysStore())
const website = computed(() => globalSetting.value.website || {})

let showSideMenu = ref(false)
let type = ref('')
onMounted(() => {
  type.value = route.hash?.replace('#', '')
})
</script>
<style lang="scss" scoped>
$max-width: 1080px;

.layout {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
    // background: rgba(255, 255, 255, 0.8);
    background-color: #fff;
    backdrop-filter: blur(5px);
    width: 100%;
    border-bottom: 2px solid #555;

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
    flex: 1;
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: $max-width;
    margin: 0 auto;
    display: flex;
    background: #fff;

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
      position: relative;
    }
  }

  .footer-container {
    display: none
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

        .search {
          max-width: 20px;

          .placeholder {
            display: none;
          }
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

    .footer-container {
      height: fit-content;
      position: relative;
      z-index: 9;
      display: block;
      background-color: #fff;
      width: 100%;
      padding: 15px;
      text-align: center;
      box-sizing: border-box;

      .footer {
        font-size: 12px;

        a {
          color: #333;
        }
      }
    }
  }
}
</style>
