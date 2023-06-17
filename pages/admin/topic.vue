<template lang="pug">
.topic-list-page
  .actions
    el-button.btn(type='primary' @click="addFormDialog.show=true") 添加
  el-table(:data='list' stripe)  
    //- el-table-column(type="selection" width="55")
    el-table-column(v-for="col in cols"  :prop='col.key' :label='col.label')
      template(#default="{row}")
        span(v-if="col.key=='createTime'") {{ moment(row.createTime).format('YYYY-MM-DD HH:mm') }}
        el-tag(v-else-if="col.key=='name'") {{ row.name }}
        el-image(v-else-if="col.key=='cover'" :preview-teleported='true'  :src='row.cover' :preview-src-list='[row.cover]')
        span(v-else) {{ row[col.key] }}
    el-table-column
      template(#default="{row,$index}")
        el-button(type="danger" text @click="handleDelete(row,$index)") 删除
        el-button(type="primary" text @click="handleEdit(row,$index)") 编辑
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
definePageMeta({
  middleware: ["auth"],
});
import $http from "@/utils/http.js";
import moment from "moment";
import { PictureFilled } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { uploadImage } from "@/utils/upload.js";

const cols = [
  {
    label: "ID",
    key: "_id",
  },
  {
    label: "主题",
    key: "name",
  },
  {
    label: "封面",
    key: "cover",
  },
  {
    label: "创建时间",
    key: "createTime",
  },
];

let inputEl = ref();
let list = ref([]);
_getList();
let addFormDialog = ref({
  show: false,
  loading: false,
  editIndex: -1,
  form: {
    cover: "",
    name: "",
  },
});

function _getList() {
  $http.get("/api/topic").then((res) => {
    list.value = res?.data;
  });
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

function handleEdit(data, index) {
  addFormDialog.value.show = true;
  addFormDialog.value.editIndex = index;
  addFormDialog.value.form = data;
}

function handleDelete(data, index) {
  ElMessageBox.confirm("是否删除", "Warning", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    $http.delete("/api/topic/" + data._id).then((res) => {
      if (res.deletedCount > 0) {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        list.value.splice(index, 1);
      }
    });
  });
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
      _getList();
      if (addFormDialog.value.editIndex >= 0) {
        list.value[addFormDialog.value.editIndex] = res.data;
      }
      ElMessage({
        message: "操作成功",
        type: "success",
      });
      addFormDialog.value.form = { cover: "", name: "" };
      addFormDialog.value.editIndex = -1;
      addFormDialog.value.show = false;
    })
    .catch((err) => {
      ElMessage.error(err?.msg || "未知错误");
    })
    .finally(() => {
      addFormDialog.value.loading = false;
    });
}
</script>
<style lang="scss" scoped>
.topic-list-page {
  .actions {
    margin-bottom: 15px;
    text-align: right;
    .btn {
      width: 100px;
    }
  }
}
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
