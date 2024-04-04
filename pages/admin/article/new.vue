<template lang="pug">
.new-article()
  .actions
    .time(v-if="cacheTime") {{ moment(cacheTime).format('YYYY MMMM Do, hh:mm:ss') }}已缓存
      el-button(text @click='clearCache') 清除缓存
    el-button.btn.confirm(type='primary' @click="save" :loading='loading') {{form._id?'保存':'发布'}}
  .container
    .form-item
      .label 类型
      .topics
        .topic.type(v-for='item in typeList' @click='form.type=item.key' :class='`${form.type==item.key&&"active"}`') {{ item.label }}
    .cover(v-if='form.type=="article"')
      el-icon(size='35' v-if='!form.cover')
        PictureFilled
      img( v-if='form.cover' :src='form.cover')
      input(type='file' accept="image/*" @change="onInputChange" style="position:absolute;width:100%;height:100%;opacity:0")
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
    .form-item(v-if="form.type=='moment'")
      .label 电影
      div(style="display:flex;align-items:center;margin-bottom:15px;")
        el-select(v-model="form.movie" v-loading="searching" clearable value-key="link" style='flex:1;max-width:500px' filterable remote :remote-method="onMovieInput" reserve-keyword placeholder='搜索电影' :loading="searching")
          el-option(v-for="item in movieList" :label="item.title" :value="item")
        el-button(:disabled="!movieName" style="margin-left:15px" type="primary" :icon="Search" circle @click="searchMovie")
    comLocation(v-model="form.location")
    .title(v-if='form.type=="article"')
      el-input.input(placeholder="请输入文章标题" v-model="form.title" :maxlength='100' show-word-limit)
    .content
      div(v-if='form.type=="article"')
        RichEditor(ref="richEditorEl" :value="form.htmlContent")
      textarea.textarea(v-if='form.type=="moment"' v-model='form.htmlContent' placeholder="内容" maxlength='800')
    .imgs(v-if='form.type!="article"')
      .item(v-for='(item,index) in form.imgs')
        .loading(v-if="!item")
          el-icon.icon(size='25')
            Loading
        el-image(v-else :preview-teleported='true' :initial-index="index" style="width: 100%; height: 100%" fit='cover'  :src='item+"?x-oss-process=image/resize,m_fill,w_400"' :preview-src-list='form.imgs')
        el-icon.clear(:size="30" v-if='item' @click.stop="form.imgs.splice(index,1)")
          CircleCloseFilled
      .item(v-if="form.imgs.length<maxImgs")
        input.input(type='file' multiple accept="image/*" @change="onChooseImg")
        el-icon(size='20')
          PictureFilled
</template>
<script setup>
import moment from "moment";
import $http from "@/utils/http.js";
import { PictureFilled, Plus, Loading, CircleCloseFilled, Search } from "@element-plus/icons-vue";
import { uploadImage } from "@/utils/upload.js";
import { ElMessage, ElMessageBox } from "element-plus";
import comAddTopic from '../__com__/addTopic'
import comLocation from './components/location.vue'
import { movieName, movieList, searchMovie, searching, onMovieInput, Form } from './create.js'

const route = useRoute();
const router = useRouter();

let richEditorEl = ref(null)
let loading = ref(false);
let form = ref(new Form());
let cacheTime = ref()
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
]

getTopicList();
let timer
onMounted(() => {
  if (route.query.id) {
    $http.get(`/api/article/${route.query.id}`).then((res) => {
      form.value = res.data;
      if (res.data?.movie?.link) {
        movieList.value = [res.data.movie]
      }
    });
  } else {
    let cache = window.localStorage['cache-article'] || ""
    if (cache) {
      try {
        cache = JSON.parse(cache)
        if (!cache._id) {
          form.value = cache || form.value
          window.localStorage['cache-article'] = ""
        }
      } catch { }
    }
  }
  timer = setInterval(() => {
    let payload = getPayload()
    if (payload.textContent && !payload._id) {
      cacheTime.value = new Date()
      payload.cacheTime = cacheTime.value
      window.localStorage['cache-article'] = JSON.stringify(payload)
    }
  }, 10000);
})
onBeforeUnmount(() => {
  clearInterval(timer)
})

function clearCache() {
  form.value = new Form()
  cacheTime.value = ""
  window.localStorage['cache-article'] = ""
}

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
function onInputChange(e) {
  let files = e.target.files;
  if (files.length) {
    uploadImage(files[0], "article/cover").then((url) => {
      form.value.cover = url;
    });
  }
  e.value = ''
}
//上传图片
async function onChooseImg(e) {
  console.log(e)
  let folder = "photo"
  if (form.value.type == 'photo') {
    folder += `/${form.value.title}`
  }
  for (let index = 0; index < e.target.files.length; index++) {
    if (form.value.imgs.length > maxImgs.value) {
      break;
    }
    const file = e.target.files[index];
    await uploadImage(file, folder).then(url => {
      form.value.imgs.push(url)
    })
  }
  e.target.value = ''
}

function getPayload() {
  let payload = {
    ...form.value,
    topics: form.value.topics.map((item) => item._id),
  };
  if (form.value.type == 'article') {
    payload.textContent = richEditorEl.value.getPureText()
    payload.htmlContent = richEditorEl.value.getHtmlContent()
  } else {
    payload.textContent = form.value.htmlContent
  }
  return payload
}

function save() {
  loading.value = true;
  let payload = getPayload()
  let req;
  if (form.value._id) {
    req = $http.put("/api/admin/article", payload);
  } else {
    req = $http.post("/api/admin/article", payload);
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
      clearInterval(timer)
      window.localStorage['cache-article'] = ""
      loading.value = false;
    });
}

</script>
<style lang="scss" scoped>
.new-article {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  padding-bottom: 50px;
  box-sizing: border-box;

  .actions {
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 99;
    top: 0;
    background: rgba(255, 255, 255);
    padding: 15px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;

    .time {
      color: #999;
      margin-right: 20px;
      font-size: 12px;
    }

    .btn {

      &.confirm {}
    }
  }

  .container {
    padding: 15px;
    border-radius: 5px;
    background: #fff;
    box-sizing: border-box;
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
      pointer-events: none;
    }
  }

  .form-item {
    .label {
      font-size: 12px;
      color: #333;
      margin-bottom: 5px;
    }

    .input {
      margin-bottom: 15px;
    }

    .movie {
      display: flex;
      color: #333;

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
      }
    }
  }

  .topics {

    .topic {
      display: inline-block;
      width: fit-content;
      font-size: 13px;
      border-radius: 8px;
      background: #f5f5f5;
      padding: 6px 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      color: #333;
      transition: all 0.3s;
      user-select: none;
      cursor: pointer;

      &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }

      &.active {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: #fff;
      }

      &.type {
        padding: 8px 15px;
        font-size: 15px;
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
    max-width: 500px;
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

      .loading {
        position: absolute;
        z-index: 9;
        color: var(--primary-color);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .icon {
          animation: loading 1s linear infinite;
          transform-origin: center center;
        }
      }

      .clear {
        position: absolute;
        top: 0;
        right: 0;
        color: red;
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
}

@keyframes loading {
  100% {
    transform: rotate(360deg);
  }
}
</style>
