<template>
  <div class="layout">
    <div class="smoke-bg" id="smoke-bg"></div>
    <div class="topbar-container">
      <div class="topbar">
        <el-icon class="menu" :size="20" @click="showSideMenu = !showSideMenu">
          <Menu></Menu>
        </el-icon>
        <div class="host" @click="router.replace('/')">{{ website?.name }}</div>
        <!-- <div class="search" @click="router.push('/search')" v-if="route.name != 'search'">
          <div class="placeholder">搜索</div>
          <el-icon class="icon">
            <Search></Search>
          </el-icon>
        </div> -->
        <div>
          <comMood style="position: relative;top: 0;" :size='30' />
        </div>
      </div>
    </div>
    <div class="content-container">
      <div class="mask" v-if="showSideMenu" @click="showSideMenu = false"></div>
      <div class="side" :class="`${showSideMenu && 'show'}`" @click="showSideMenu = false">
        <comSideMenu v-model="type"></comSideMenu>
        <!-- <div :class="['bg']">
          <img :src="`/icon/${theme == 'dark' ? 'wave_dark' : 'wave'}.png`" v-for="item in 30"
            onerror="this.style.display='none';">
        </div> -->
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <div class="footer-container">
      <div class="footer"><a href="https://beian.miit.gov.cn" target="_blank">{{ beian }}</a></div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { Search, Menu } from "@element-plus/icons-vue";
import comSideMenu from '@/pages/components/sideMenu.vue'
import comMood from '@/pages/components/mood.vue'
import SmokeBg from './smokeBg'

const router = useRouter();
const route = useRoute();
const { globalSetting, beian, theme } = storeToRefs(useSysStore())
const website = computed(() => globalSetting.value.website || {})

let showSideMenu = ref(false)
let type = ref('')
onMounted(() => {
  type.value = route.hash?.split('#').filter(item => Boolean(item))[0]
  new SmokeBg('smoke-bg')
})
</script>
<style lang="scss" scoped>
$max-width: 1080px;


.layout {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0E0F24;
  overflow: hidden;

  // &::before {
  //   content: '';
  //   position: fixed;
  //   width: 100vw;
  //   height: 100vh;
  //   background-image: url(/bg.png);
  // }

  .smoke-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0E0F24;
  }

  .topbar-container {
    position: sticky;
    top: 0;
    z-index: 9+1;
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
      background-color: #fff;

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
        opacity: 0;
        pointer-events: none;

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
    // background: #fff;
    transform: scale(1);
    box-sizing: border-box;

    .mask {
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      backdrop-filter: blur(5px);
    }

    .side {
      position: relative;
      z-index: 11;
      background-color: #f5f5f5;
      padding-right: 5px;
      padding-left: 5px;
      padding-top: 15px;
      overflow: hidden;
      box-sizing: border-box;

      .bg {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        width: 30px;
        height: 100%;
        font-size: 0;

        img {
          width: 100%;
          height: auto;
        }
      }
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
