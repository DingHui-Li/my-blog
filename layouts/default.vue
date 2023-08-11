<template lang="pug">
.layout
  .topbar-container
    .tabbar
      .host(@click="router.replace('/')") {{ website?.name }}
      .search(@click="router.push('/search')" v-if="route.name!='search'")
        .placeholder 搜索
        el-icon.icon
          Search
  .content-container
    .side
      comSideMenu(v-model='type')
    .content 
      slot
  //- .footer-container
  //-   .footer
  //-     a(href='https://github.com/DingHui-Li/my-blog' target="_blank") github

</template>
<script setup>
import { Search } from "@element-plus/icons-vue";
import comSideMenu from '@/pages/components/sideMenu.vue'
const router = useRouter();
const route = useRoute();
const sys = useSysStore()
let website = sys.globalSetting.website

let type = ref('')
</script>
<style lang="scss" scoped>
$max-width: 900px;

.layout {
  width: 100%;
  min-height: 100vh;
  background: #dee0ed;

  .topbar-container {
    position: sticky;
    top: 0;
    z-index: 9;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    width: 100%;
    border-bottom: 1px solid #eee;

    .tabbar {
      max-width: $max-width;
      height: 50px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;

      .host {
        font-size: 20px;
        font-weight: bold;
        color: #263238;
        cursor: pointer;
      }

      .search {
        margin-left: 30px;
        width: 100%;
        max-width: 150px;
        overflow: hidden;
        padding: 7px 10px;
        border-radius: 30px;
        background: orangered;
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
    width: 100%;
    max-width: $max-width;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;

    .side {
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
</style>
