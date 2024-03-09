<template>
  <div class="login-page">
    <div class="card">
      <img v-if="website.cover" class="cover" :src="website.cover" alt="">
      <div class="content">
        <el-icon class="icon-key" size="20" @click="getTotpQr">
          <Key />
        </el-icon>
        <div class="title">{{ website.name }}</div>
        <div class="input-box">
          <input class="input" placeholder="请输入动态验证码" v-model="input" />
        </div>
        <div :class="['btn', input.length != 6 && 'disabled']" @click="login">验证</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Key } from "@element-plus/icons-vue";
import $http from "@/utils/http.js";
import { ElMessage, ElMessageBox } from 'element-plus'

const input = ref('')
const router = useRouter()
const { globalSetting } = storeToRefs(useSysStore())
const website = computed(() => globalSetting.value.website || {})

function getTotpQr() {
  ElMessageBox.prompt('请输入后台配置的密钥', '绑定', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
      if (value) {
        $http.get('/api/getTOTPQR', { secret: value }).then(res => {
          ElMessageBox({
            title: '绑定动态验证码',
            message: h('div', null, [
              h('div', null, '使用Google Authenticator,Microsoft Authenticator等2FA客户端扫描二维码'),
              res.data ? h('img', { style: 'width:200px;height:auto;', src: res.data }, 'VNode') : h('div', { style: "color:red;margin-top:30px" }, '获取二维码失败'),
            ]),
          })
        })
      }
    })
}

function login() {
  if (input.value) {
    useSysStore().login({ code: input.value }).then(() => {
      console.log("登录成功")
      router.replace("/admin")
    })
  }
}
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  background-color: #dee0ed;

  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: calc(100% - 30px);
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.05);
    overflow: hidden;

    .cover {
      width: 100%;
      height: auto;
      aspect-ratio: 16/9;
      object-fit: cover;
    }

    .content {
      position: relative;
      padding: 30px;
    }

    .icon-key {
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;

      &:active {
        opacity: 0.5;
      }
    }

    .title {
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      margin-top: 10px;
    }

    .input-box {
      width: 100%;
      margin-top: 60px;
      border: 1px solid #dee0ed;
      padding: 15px;
      box-sizing: border-box;
      border-radius: 8px;

      .input {
        width: 100%;
        font-size: 15px;
        color: #333;
        border: none;
        outline: none;
        text-align: center;
      }
    }

    .btn {
      padding: 15px;
      border-radius: 8px;
      background-color: var(--primary-color);
      text-align: center;
      font-size: 15px;
      color: #fff;
      margin-top: 60px;
      margin-bottom: 20px;

      &:active {
        opacity: 0.8;
      }

      &.disabled {
        pointer-events: none;
        filter: brightness(60%);
      }
    }
  }
}
</style>
