<template lang="pug">
.new-article
  .container
    .form-item
      .label 类型
      .topics
        .topic(v-for='item in typeList' @click='form.type=item.key' :class='`${form.type==item.key&&"active"}`') {{ item.label }}
    .cover(@click="chooseImage" v-if='form.type=="article"')
      el-icon(size='35')
        PictureFilled
      img( v-if='form.cover' :src='form.cover')
      input(type='file' ref="inputEl" accept="image/*" @change="onInputChange" style="display:none")
    .form-item
      .label 标签
      .topics
        .topic(v-for="item in topics" 
          :class="selectedTopicsMap[item._id]&&'active'" 
          @click="handleTopicClick(item)")  {{ item.name }}
        comAddTopic(@confirm='getTopicList')
          .topic 
            el-icon(size='15')
              Plus
    .title(v-if='form.type=="article"')
      el-input.input(placeholder="请输入文章标题" v-model="form.title" :maxlength='100' show-word-limit)
    .title(v-if='form.type=="photo"')
      el-input.input(placeholder="相册名称" v-model="form.title" :maxlength='10' show-word-limit)
    .content
      div(v-if='form.type=="article"')
        Editor( v-model="form.htmlContent" :init='editorInit' ref='editorEl')
      textarea.textarea(v-if='form.type=="moment"' v-model='form.htmlContent' placeholder="内容" maxlength='800')
    .imgs(v-if='form.type!="article"')
      .item(v-for='item in form.imgs')
        img(:src='item')
      .item(v-if="form.imgs.length<maxImgs")
        input.input(type='file' multiple accept="image/*" @change="onChooseImg")
        el-icon(size='20')
          PictureFilled
  .actions
    el-button(type='primary' @click="save" :loading='loading') {{form._id?'保存':'发布'}}
</template>
<script setup>
definePageMeta({
  middleware: ["auth"],
});
import $http from "@/utils/http.js";
import { PictureFilled, Plus } from "@element-plus/icons-vue";
import Editor from "@tinymce/tinymce-vue";
import { uploadImage } from "@/utils/upload.js";
import { ElMessage, ElMessageBox } from "element-plus";
import comAddTopic from '../__com__/addTopic'

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
  type: "moment",
  imgs: []
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
let typeList = [
  {
    label: "动态",
    key: "moment"
  },
  {
    label: "文章",
    key: "article"
  },
  {
    label: "相册",
    key: "photo"
  },
]
getTopicList();

let selectedTopicsMap = computed(() => {
  let _t = {};
  form.value.topics.forEach((item) => {
    _t[item._id] = true;
  });
  return _t;
});
let maxImgs = computed(() => {
  return form.value.type == "photo" ? 99 : 9
})

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
//选择封面
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
//上传图片
async function onChooseImg(e) {
  let folder = "photo"
  if (form.value.type == 'photo') {
    folder += `/${form.value.title}`
  }
  for (let index = 0; index < e.target.files.length; index++) {
    if (form.value.imgs.length > maxImgs.value) {
      break;
    }
    const file = e.target.files[index];
    let url = await uploadImage(file, folder)
    console.log('url==', url)
    form.value.imgs.push(url)
  }
}
function save() {
  loading.value = true;
  let pureContentText;
  if (form.value.type == 'article') {
    pureContentText = editorEl.value.getEditor().getContent({ format: "text" })
  } else {
    pureContentText = form.value.htmlContent
  }
  let payload = {
    ...form.value,
    topics: form.value.topics.map((item) => item._id),
    textContent: pureContentText,
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
    margin-bottom: 10px;

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

  .form-item {
    .label {
      font-size: 12px;
      color: #333;
      margin-bottom: 5px;
    }
  }

  .topics {

    .topic {
      display: inline-block;
      width: fit-content;
      font-size: 15px;
      border-radius: 8px;
      background: #f5f5f5;
      padding: 4px 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      color: #333;
      transition: all 0.3s;
      user-select: none;
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

  .content {
    box-sizing: border-box;

    .textarea {
      width: calc(100% - 30px);
      border: none;
      background: #f5f5f5;
      outline: none;
      padding: 15px;
      font-size: 15px;
      height: 200px;
    }
  }

  .imgs {
    width: 100%;
    max-width: 300px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .item {
      position: relative;
      display: inline-block;
      width: 33.333%;
      aspect-ratio: 1;
      border-radius: 8px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:active {
        opacity: 0.8;
      }

      .input {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        opacity: 0;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
