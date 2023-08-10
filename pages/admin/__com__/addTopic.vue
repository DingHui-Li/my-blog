<template lang="pug">
div(@click='handleOpen')
  slot
el-dialog(v-model='addFormDialog.show' title='添加主题')
  .add-form
    el-form(label-width='100px')
      el-form-item(label='主题名称')
        el-input(v-model='addFormDialog.form.name')
      el-form-item(label='封面图')
        .choose-image()
          input(type='file' ref="inputEl" accept="image/*" @change="onInputChange")
          el-icon(size='25')
            PictureFilled
          el-image.img(v-if='addFormDialog.form.cover' :src='addFormDialog.form.cover' :preview-teleported='true' :preview-src-list="[addFormDialog.form.cover]" fit="cover")
        .btns
          el-button( type='primary' @click="chooseImage") 上传
    .actions
      el-button.btn(@click="addFormDialog.show=false") 取消
      el-button.btn(type='primary' @click="saveTopic" :loading='addFormDialog.loading') 确定
</template>
<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { uploadImage } from "@/utils/upload.js";
import $http from "@/utils/http.js";
import { PictureFilled } from "@element-plus/icons-vue";

let inputEl = ref();
class Dialog {
  show = false;
  loading = false;
  form = {
    _id: "",
    cover: "",
    name: "",
  }
}
const emits = defineEmits(['confirm'])
defineExpose({ open })
let addFormDialog = ref(new Dialog());
function handleOpen() {
  addFormDialog.value = new Dialog()
  addFormDialog.value.show = true
}
function open(e) {
  addFormDialog.value = new Dialog()
  addFormDialog.value.form = e
  addFormDialog.value.show = true
}
function chooseImage() {
  inputEl.value.click();
}
function onInputChange(e) {
  let files = e.target.files;
  if (files.length) {
    uploadImage(files[0], "topic").then((url) => {
      addFormDialog.value.form.cover = url;
    });
  }
}

function saveTopic() {
  addFormDialog.value.loading = true;
  let req;
  if (addFormDialog.value.form._id) {
    req = $http.put("/api/topic", addFormDialog.value.form);
  } else {
    req = $http.post("/api/topic", addFormDialog.value.form);
  }
  req
    .then((res) => {
      ElMessage({
        message: "操作成功",
        type: "success",
      });
      addFormDialog.value = new Dialog()
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error(err?.msg || "未知错误");
    })
    .finally(() => {
      addFormDialog.value.loading = false;
      emits('confirm')
    });
}
</script>
<style lang='scss' scoped>
.add-form {
  .choose-image {
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f9f9;

    input {
      display: none;
    }

    .img {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }

  .btns {
    margin-left: 15px;
  }

  .actions {
    margin-top: 100px;
    text-align: center;

    .btn {
      width: 200px;
      margin: 0 10px;
    }
  }
}
</style>