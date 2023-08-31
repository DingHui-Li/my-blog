<template lang="pug">
.setting-page
  .title 网站设置
  .form-item
    .label 名称
    .value 
      el-input(v-model='form.website.name')
  .form-item
    .label 封面图片
    .value 
      .img()
        el-icon(:size='20' v-if='!form.website.cover')
          PictureFilled
        img(v-else :src='form.website.cover')
        input(type='file' ref="inputEl" accept="image/*" @change="onChooseImg($event,'cover')")
  .title 站长信息
  .form-item
    .label 姓名
    .value 
      el-input(v-model='form.profile.name')
  .form-item
    .label 头像
    .value 
      .img
        el-icon(:size='20' v-if='!form.profile.avatar')
          PictureFilled
        img(v-else :src='form.profile.avatar')
        input(type='file' ref="inputEl" accept="image/*" @change="onChooseImg($event,'avatar')")
  .actions
    el-button(type='primary' style="width:100px" @click='handleSave') 保存
</template>
<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { uploadImage } from "@/utils/upload.js";
import $http from "@/utils/http.js";
import { PictureFilled } from "@element-plus/icons-vue";
const store = useSysStore()
store.getData().then(res => {
  if (res?.data) {
    form.value = res.data
  }
})
console.log(store)
let inputEl = ref()

let form = ref(new GlobalSetting())

function onChooseImg(e, type) {
  let files = e.target.files;
  if (files.length) {
    uploadImage(files[0], "setting").then((url) => {
      if (type == 'cover') {
        form.value.website.cover = url
      } else if (type == 'avatar') {
        form.value.profile.avatar = url
      }
    });
  }
}

function handleSave() {
  $http.post('/api/admin/sys/setting', { ...toRaw(form.value) }).then((res) => {
    ElMessage({
      message: "操作成功",
      type: "success",
    });
  })
    .catch((err) => {
      console.log(err)
      ElMessage.error(err?.msg || "未知错误");
    })
}
</script>
<style lang='scss' scoped>
.setting-page {
  .title {
    font-size: 15px;
    font-weight: bold;
    margin-top: 30px;
  }

  .form-item {
    display: flex;
    align-items: center;
    padding: 10px 0;

    .label {
      width: 100px;
      text-align: right;
      font-size: 14px;
      color: #999;
      margin-right: 15px;
    }

    .value {
      flex: 1;
      overflow: hidden;
      max-width: 500px;

      .img {
        position: relative;
        width: 100px;
        height: 100px;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        input {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
          opacity: 0;
        }
      }
    }
  }

  .actions {
    margin-top: 30px;
    text-align: center;
  }
}
</style>