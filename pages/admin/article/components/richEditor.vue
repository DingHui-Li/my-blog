<template lang="pug">
.rich-editor
    el-button.btn(@click="showDialog=true") 插入代码块
    Editor(v-model="editorValue" :init='editorInit' ref='editorEl')
el-dialog(v-model="showDialog" title="插入代码块")
    .dialog
        .code-editor(ref="codeEditorEl" contentEditable="true")
        .actions
            el-button(@click="showDialog=false") 关闭
            el-button(type='primary' @click="handleInsertCode") 确定
</template>
<script setup>
import Editor from "@tinymce/tinymce-vue";
import { uploadImage } from "@/utils/upload.js";

const props = defineProps({
    modelValue: String
})
const emits = defineEmits('update:modelValue')
defineExpose({
    getPureText,
})

let showDialog = ref(false)
let editorEl = ref();
let codeEditorEl = ref();
let editorValue = ref()
let editorInit = ref({
    language_url: "/zh-Hans.js",
    language: "zh-Hans",
    paste_data_images: true,
    plugins: "image link code table lists wordcount autoresize",
    toolbar:
        "h1 h2 h3 fontsize fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink blockquote table numlist bullist preview fullscreen",
    images_upload_handler: (blobInfo) => uploadImage(blobInfo.blob(), "article"),
});

watch(() => props.modelValue, v => {
    editorValue.value = v
}, { immediate: true })
watch(editorValue, v => {
    emits('update:modelValue', v)
})

function getPureText() {
    return editorEl.value?.getEditor().getContent({ format: "text" })
}

function handleInsertCode() {
    let content = codeEditorEl.value.innerHTML
    content = content.replace(`style="`, `class="code-block" style="padding:15px;border-radius:10px;`)
    content = content.replace(/style="/g, `contenteditable="false" style="white-space: pre-wrap !important;`)
    content = content.replace(/<div>\s /g, '<div>&nbsp;&nbsp;');

    console.log(content)
    showDialog.value = false
    editorEl.value?.getEditor().insertContent(content)
    codeEditorEl.value.innerHTML = ""
}
</script>
<style lang='scss' scoped>
.rich-editor {
    position: relative;

    .btn {
        position: absolute;
        z-index: 99;
        right: 15px;
        top: 10px;
        background-color: #8BC34A;
        color: #fff;
    }

    &:deep(.tox-tinymce) {
        overflow: visible;

        .tox-editor-container {
            overflow: visible;

            .tox-editor-header {
                position: sticky;
                top: 60px;
                z-index: 9;
            }
        }

    }
}

.dialog {
    .code-editor {
        background-color: #f5f5f5;
        height: 50vh;
        overflow: auto;
        padding: 15px;
    }

    .actions {
        margin-top: 10px;
        text-align: right;
    }
}
</style>