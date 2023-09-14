<template lang="pug">
.topic-list-page
  .actions
    comAddTopic(ref='addDialogEl' @confirm='getList')
      el-button.btn(type='primary' @click="addFormDialog.show=true") 添加
  el-table(:data='list' stripe)  
    //- el-table-column(type="selection" width="55")
    el-table-column(v-for="col in cols"  :prop='col.key' :label='col.label')
      template(#default="{row}")
        span(v-if="col.key=='createTime'") {{ moment(row.createTime).format('YYYY-MM-DD HH:mm') }}
        el-tag(v-else-if="col.key=='name'") {{ row.name }}
        el-image(v-else-if="col.key=='cover'" style='width:30px' :preview-teleported='true'  :src='row.cover' :preview-src-list='[row.cover]')
        span(v-else) {{ row[col.key] }}
    el-table-column
      template(#default="{row,$index}")
        el-button(type="danger" text @click="handleDelete(row,$index)") 删除
        el-button(type="primary" text @click="handleEdit(row,$index)") 编辑
</template>
<script setup>
definePageMeta({
  middleware: ["auth"],
});
import $http from "@/utils/http.js";
import moment from "moment";
import { ElMessage, ElMessageBox } from "element-plus";
import comAddTopic from './__com__/addTopic'

let addDialogEl = ref()

const cols = [
  // {
  //   label: "ID",
  //   key: "_id",
  // },
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


let list = ref([]);
getList();

function getList() {
  $http.get("/api/topic").then((res) => {
    list.value = res?.data;
  });
}

function handleEdit(data, index) {
  addDialogEl.value.open(data)
}

function handleDelete(data, index) {
  ElMessageBox.confirm("是否删除", "Warning", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    $http.delete("/api/admin/topic/" + data._id).then((res) => {
      ElMessage({
        message: "删除成功",
        type: "success",
      });
      getList()
    });
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
</style>
