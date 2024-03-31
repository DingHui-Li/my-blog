<template lang="pug">
.topic-list-page
  .filter-container
    el-form
      el-form-item(label='文章标题')
        el-input(v-model="filter.title")
      el-form-item(label='文章内容')
        el-input(v-model="filter.content")
    el-button(@click='reset') 重置
    el-button(type='primary' @click='pagation.page=1;_getList()') 搜索
  .actions
    el-button.btn(type='primary' @click="router.push('/admin/article/new')") 写文章
  el-table(:data='list' stripe :loading='pagation.loading' @row-click='handleRowClick' :row-key='row=>row.id')  
    //- el-table-column(type="selection" width="55")
    el-table-column(v-for="col in cols"  :prop='col.key' :label='col.label')
      template(#default="{row}")
        span(v-if="col.key=='createTime'") {{ moment(row.createTime).format('YYYY-MM-DD HH:mm') }}
        span(v-else-if="col.key=='updateTime'") {{ moment(row.updateTime).format('YYYY-MM-DD HH:mm') }}
        span(v-else-if="col.key=='type'")
          el-tag(:type="row.type=='moment'?'success':''") {{ row.type }}
        span(v-else-if="col.key=='title'") 
          span(v-if='row.type=="moment"') {{ row.desc }}
          span(v-else) {{ row.title }}
        span(v-else) {{ row[col.key] }}
    el-table-column
      template(#default="{row}")
        el-button(type="primary" @click='router.push({path:"/admin/article/new",query:{id:row._id}})') 编辑
        el-button.btn(type='danger' @click="handleDelete(row)") 删除
  .pagination
    el-pagination(background 
      layout="sizes,prev, pager, next" 
      :total="pagation.total"  
      v-model:page-size='pagation.size' 
      v-model:current-page='pagation.page' 
      @current-change='getList' 
      @size-change="pagation.page=1;_getList()")
  </template>
<script setup>
import moment from "moment";
import useList from "@/hooks/useList";
import { ElMessage, ElMessageBox } from 'element-plus'
import $http from "@/utils/http.js";

const router = useRouter();
let { pagation, list, getList } = useList("/api/admin/articleList");

class Filter {
  title = null;
  content = null;
}
const cols = [
  {
    label: "ID",
    key: "_id",
  },
  {
    label: "标题",
    key: "title",
  },
  {
    label: "类型",
    key: "type",
  },
  {
    label: "创建时间",
    key: "createTime",
  },
  {
    label: "更新时间",
    key: "updateTime",
  },
];
let filter = ref(new Filter());
_getList();

function reset() {
  pagation.value.page = 1;
  filter.value = new Filter();
  _getList();
}
function _getList() {
  getList(filter.value);
}
function handleDelete(e) {
  ElMessageBox.confirm(
    '确定删除？删除后无法恢复！',
    '警告',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    $http.delete(`/api/admin/article/${e._id}`).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getList(filter.value);
    }).catch(err => {
      ElMessage({
        type: 'error',
        message: err?.msg || err?.message || "未知错误",
      })
    })
  })
}
</script>
<style lang="scss" scoped>
.topic-list-page {
  padding: 15px;
  background-color: #fff;

  .actions {
    margin-bottom: 15px;
    text-align: right;

    .btn {
      width: 100px;
    }
  }

  .filter-container {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;

    &:deep(.el-form-item) {
      width: 400px;
      margin-right: 15px;

      .el-form-item__label {
        font-size: 12px;
        color: #333;
        font-weight: bold;
        width: 100px;
      }
    }
  }

  .pagination {
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
}
</style>
../../../hooks/useList.js