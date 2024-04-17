<template lang="pug">
.rich-editor(:class="readonly&&'readonly'")
    //- Editor(v-model="editorValue" :init='editorInit' ref='editorEl')
    EditorContent(:editor="editor")
    bubble-menu(
        v-if='editor'
        class="bubble-menu" :tippy-options="{ duration: 100 }" :editor="editor")
            .item.disabled >
            .item(@click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }") 加粗
            .item(@click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }") 斜体
            .item(@click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }") 划线
            .item(@click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }") 段落
            .item(@click="editor.chain().focus().toggleHighlight().run()" :class="{ 'is-active': editor.isActive('highlight') }") 高光
            .item(@click="setLink" :class="{ 'is-active': editor.isActive('link') }") 链接
            .item(@click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')") 取消链接
            .item(v-for="item in 6" @click="editor.chain().focus().toggleHeading({ level: item }).run()" :class="{ 'is-active': editor.isActive('heading', { level: item }) }") H{{ item }}
            div
            .item.disabled >
            .item(v-for="item in aligns" @click="editor.chain().focus().setTextAlign(item.value).run()" :class="{ 'is-active': editor.isActive({ textAlign: item.value }) }") {{ item.label }}
            div
            .item.disabled >
            .item(@click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock')}") 代码块
            .item(@click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }") 无序列表
            .item(@click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }") 有序列表
            .item(@click="editor.chain().focus().setHorizontalRule().run()") 分隔线
            .item(@click="editor.chain().focus().setHardBreak().run()") 空行
            div
            .item.disabled >
            .item(@click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()") undo ⬅️
            .item(@click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()") redo ➡️
</template>
<script setup lang="ts">
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { Editor, EditorContent, BubbleMenu, VueNodeViewRenderer } from '@tiptap/vue-3'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import CodeBlockComponent from './codeBlockComponent.vue'
import { createLowlight } from 'lowlight'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Image from '@tiptap/extension-image'

import { uploadImage } from "@/utils/upload.js";

import { ElMessageBox } from 'element-plus'

const lowlight = createLowlight({ html, css, js, ts })

const props = defineProps({
    value: {
        type: String,
        default: ""
    },
    readonly: {
        type: Boolean,
        default: false
    }
})

defineExpose({
    getPureText,
    getHtmlContent
})

const aligns = [
    {
        label: '左对齐',
        value: 'left'
    },
    {
        label: '居中',
        value: 'center'
    },
    {
        label: '右对齐',
        value: 'right'
    }
]

let editor = new Editor({
    editable: !props.readonly,
    extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Image.configure({
            HTMLAttributes: {
                class: 'content-img',
            },
        }),
        Highlight,
        Link.configure({

        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        FileHandler.configure({
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
            onDrop: onFileDrop,
            onPaste: onFilePaste
        }),
        CodeBlockLowlight
            .extend({
                addNodeView() {
                    return VueNodeViewRenderer(CodeBlockComponent)
                },
            })
            .configure({ lowlight }),
    ],
});

watch(() => props.value, (v: any) => {
    if (editor) {
        editor.commands.insertContent(v)
    }
}, { immediate: true })

function getPureText() {
    return editor.getText()
}
function getHtmlContent() {
    return editor.getHTML()
}

function onFileDrop(currentEditor: any, files: Array<File>, pos: any) {
    files.forEach(file => {
        uploadImage(file, "article").then(url => {
            currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                    src: url,
                },
            }).focus().run()
        })
    })
}
function onFilePaste(currentEditor: any, files: Array<File>, htmlContent: any) {
    if (htmlContent) {
        return false
    }
    files.forEach(file => {
        uploadImage(file, "article").then(url => {
            currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                    src: url,
                },
            }).focus().run()
        })
    })
}

function setLink() {
    ElMessageBox.prompt('', '添加链接', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern:
            /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
        inputErrorMessage: '无效链接',
    }).then(({ value }) => {
        if (value) {
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: value })
                .run()
        }
    })
}
</script>
<style lang='scss' scoped>
.rich-editor {
    width: 100%;
    position: relative;
    min-height: 50vh;

    .btn {
        position: absolute;
        z-index: 99;
        right: 15px;
        top: 10px;
        background-color: #8BC34A;
        color: #fff;
    }

    &:deep(.tiptap) {
        width: 100%;
        box-sizing: border-box;
        padding: 30px 15px;
        border: 3px solid #000;
        border-radius: 15px;
        outline: none;
        @import '@/style/richtext.scss';

        >*+* {
            margin-top: 0.75em;
        }
    }

    &.readonly {
        &:deep(.tiptap) {
            border: none;
            padding: 0;
        }
    }

    .bubble-menu {
        padding: 5px;
        background-color: rgba(0, 0, 0, 0.9);
        border-radius: 5px;
        font-size: 14px;
        color: #fff;
        user-select: none;

        .item {
            display: inline-block;
            padding: 5px;
            opacity: 0.8;

            &.disabled {
                pointer-events: none;
            }

            &:hover {
                opacity: 0.6;
            }

            &.is-active {
                opacity: 1;
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