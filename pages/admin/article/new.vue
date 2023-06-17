<template lang="pug">
.new-article
  .container
    .cover(@click="chooseImage")
      el-icon(size='35')
        PictureFilled
      img( v-if='form.cover' :src='form.cover')
      input(type='file' ref="inputEl" accept="image/*" @change="onInputChange" style="display:none")
    .topics
      .topic(v-for="item in topics" 
        :class="selectedTopicsMap[item._id]&&'active'" 
        @click="handleTopicClick(item)")  {{ item.name }}
    .title
      el-input.input(placeholder="请输入文章标题" v-model="form.title" :maxlength='100' show-word-limit)
    .content
      Editor(v-model="form.htmlContent" :init='editorInit' ref='editorEl')
  .actions
    el-button(type='primary' @click="save" :loading='loading') {{form._id?'保存':'发布'}}
</template>
<script setup>
definePageMeta({
  middleware: ["auth"],
});
import $http from "@/utils/http.js";
import { PictureFilled } from "@element-plus/icons-vue";
import Editor from "@tinymce/tinymce-vue";
import { uploadImage } from "@/utils/upload.js";
import { ElMessage, ElMessageBox } from "element-plus";

const route = useRoute();
const router = useRouter();

if (route.query.id) {
  $http.get(`/api/article/${route.query.id}`).then((res) => {
    form.value = res.data;
  });
}

let loading = ref(false);
let form = ref({
  cover: "",
  title: "",
  htmlContent: "",
  textContent: "",
  topics: [],
});
let editorInit = ref({
  language_url: "/zh-Hans.js",
  language: "zh-Hans",
  height: 1000,
  paste_data_images: true,
  plugins: "image link code table lists wordcount",
  toolbar:
    "fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h1 h2 h3 blockquote table numlist bullist preview fullscreen",
  images_upload_handler: (blobInfo) => uploadImage(blobInfo.blob(), "article"),
});

let editorEl = ref();
let inputEl = ref();
let topics = ref([]);
getTopicList();

let selectedTopicsMap = computed(() => {
  let _t = {};
  form.value.topics.forEach((item) => {
    _t[item._id] = true;
  });
  return _t;
});

function getTopicList() {
  $http.get("/api/topic").then((res) => {
    topics.value = res?.data;
  });
}
function handleTopicClick(topic) {
  let index = form.value.topics.findIndex((item) => item._id == topic._id);
  if (index >= 0) {
    form.value.topics.splice(index, 1);
  } else {
    form.value.topics.push(topic);
  }
}
function chooseImage() {
  inputEl.value.click();
}
function onInputChange(e) {
  let files = e.target.files;
  if (files.length) {
    uploadImage(files[0], "article/cover").then((url) => {
      form.value.cover = url;
    });
  }
}
function save() {
  loading.value = true;
  let payload = {
    ...form.value,
    topics: form.value.topics.map((item) => item._id),
    textContent: editorEl.value.getEditor().getContent({ format: "text" }),
  };
  let req;
  if (form.value._id) {
    req = $http.put("/api/article", payload);
  } else {
    req = $http.post("/api/article", payload);
  }
  req
    .then((res) => {
      ElMessageBox.alert("操作成功", "提示", {
        confirmButtonText: "确定",
        callback: () => {
          router.back();
        },
      });
    })
    .catch((err) => {
      ElMessage.error(err?.msg || "未知错误");
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
<style lang="scss" scoped>
.new-article {
  .container {
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 100px;
    background: #fff;
  }
  .cover {
    position: relative;
    width: 100%;
    height: auto;
    aspect-ratio: 19/9;
    background: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .topics {
    margin-top: 15px;
    .topic {
      display: inline-block;
      width: fit-content;
      font-size: 15px;
      border-radius: 30px;
      border: 1px solid #999;
      padding: 4px 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        border-color: orangered;
        color: orangered;
      }
      &.active {
        background: orangered;
        border-color: orangered;
        color: #fff;
      }
    }
  }
  .title {
    margin-top: 20px;
    padding-bottom: 10px;
    .input {
      font-size: 25px;
    }
    &:deep(.el-input) {
      .el-input__wrapper {
        box-shadow: none;
        border: none;

        &.is-focus {
          box-shadow: none;
        }
        .el-input__inner {
          color: #000;
          font-weight: bold;
        }
      }
    }
  }
  .actions {
    position: fixed;
    width: 100%;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    padding: 15px;
    text-align: center;
    border-top: 1px solid #eee;
    backdrop-filter: blur(5px);
  }
}
</style>
