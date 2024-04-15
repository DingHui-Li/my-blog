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
  .form-item
    .label 《关于我》
    .value 
      el-input(v-model='form.website.aboutme' placeholder="请输入文章ID")
      .article(v-if='aboutmeArticle._id' @click='jumpArticle(aboutmeArticle._id)')
        .title 《{{ aboutmeArticle.title }}》
        .time {{ moment(aboutmeArticle.updateTime).calendar() }}更新
  .form-item
    .label 《关于本站》
    .value 
      el-input(v-model='form.website.about' placeholder="请输入文章ID")
      .article(v-if='aboutArticle._id' @click='jumpArticle(aboutArticle._id)')
        .title 《{{ aboutArticle.title }}》
        .time {{ moment(aboutArticle.updateTime).calendar() }}更新
  .title 个人信息
  .form-item
    .label 昵称
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
  .form-item
    .label 生日
    .value 
      el-date-picker(
        v-model="form.profile.birthday"
        type="date"
        placeholder="选择日期")
  .actions
    el-button(type='primary' style="width:100px" @click='handleSave') 保存
</template>
<script setup>
import moment from "moment";
import { ElMessage, ElMessageBox } from "element-plus";
import { uploadImage } from "@/utils/upload.js";
import $http from "@/utils/http.js";
import { PictureFilled } from "@element-plus/icons-vue";

const router = useRouter();
const store = useSysStore()
store.getData().then(res => {
  if (res?.data) {
    form.value = res.data
  }
})
let inputEl = ref()
let form = ref({ ...store.globalSetting })
const aboutmeArticle = ref({})
const aboutArticle = ref({})

watch(() => form.value.website.aboutme, (id) => {
  if (id) {
    $http.get(`/api/article/search?_id=` + id).then(res => {
      console.log(res)
      aboutmeArticle.value = res.data[0]
    }).catch(() => {
      aboutmeArticle.value = {}
    })
  } else {
    aboutmeArticle.value = {}
  }
}, { immediate: true })
watch(() => form.value.website.about, (id) => {
  if (id) {
    $http.get(`/api/article/search?_id=` + id).then(res => {
      console.log(res)
      aboutArticle.value = res.data[0]
    }).catch(() => {
      aboutArticle.value = {}
    })
  } else {
    aboutArticle.value = {}
  }
}, { immediate: true })

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

function jumpArticle(id) {
  router.push({ path: "/admin/article/new", query: { id } })
}

function handleSave() {
  $http.post('/api/admin/sys/setting', { ...toRaw(form.value) }).then((res) => {
    ElMessage({
      message: "操作成功",
      type: "success",
    });
    store.changeGlobalSetting(res)
  })
    .catch((err) => {
      console.log(err)
      ElMessage.error(err?.msg || "未知错误");
    })
}
</script>
<style lang='scss' scoped>
.setting-page {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 15px;
  background-color: #fff;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 30px;
  }

  .form-item {
    display: flex;
    align-items: center;
    padding: 15px 0;

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
          z-index: 2;
          opacity: 0;
          cursor: pointer;
        }
      }

      .article {
        padding: 10px;
        border-radius: 8px;
        background-color: #eee;
        width: fit-content;
        margin-top: 5px;
        cursor: pointer;

        .title {
          font-size: 14px;
          color: #333;
          margin: 0;
        }

        .time {
          font-size: 12px;
          color: #999;
          margin-top: 5px;
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