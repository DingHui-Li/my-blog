import { _ as __nuxt_component_0 } from './RichEditor-b6ff57a8.mjs';
import { useSSRContext, ref, unref } from 'vue';
import { ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import moment from 'moment';
import TopicTag from './topicTag-fe971a5f.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import '@tiptap/extension-code-block-lowlight';
import '@tiptap/extension-document';
import '@tiptap/extension-paragraph';
import '@tiptap/extension-text';
import '@tiptap/starter-kit';
import '@tiptap/extension-link';
import '@tiptap/extension-highlight';
import '@tiptap/extension-text-align';
import '@tiptap/vue-3';
import 'highlight.js/lib/languages/css';
import 'highlight.js/lib/languages/javascript';
import 'highlight.js/lib/languages/typescript';
import 'highlight.js/lib/languages/xml';
import 'lowlight';
import '@tiptap-pro/extension-file-handler';
import '@tiptap/extension-image';
import './upload-b00de2b0.mjs';
import '../server.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'otplib';
import 'qrcode';
import 'jsonwebtoken';
import 'mongoose';
import 'ali-oss';
import 'crypto';
import 'request';
import 'zlib';
import 'vue-router';
import '@vueuse/core';
import 'lodash-unified';
import '@vue/shared';
import './index-a983ad61.mjs';
import './el-overlay-5312b424.mjs';
import './focus-trap-ece0c384.mjs';
import '@ctrl/tinycolor';
import './index-336e6da5.mjs';
import '@vue/reactivity';
import './vnode-f2ede823.mjs';

const _sfc_main = {
  __name: "content",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    let previewImg = ref({
      show: false,
      url: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RichEditor = __nuxt_component_0;
      _push(`<!--[--><div class="${ssrRenderClass([__props.data.cover && "has-cover", "content-container"])}" data-v-826be862>`);
      if (__props.data.cover) {
        _push(`<div class="cover" data-v-826be862><img${ssrRenderAttr("src", __props.data.cover)} data-v-826be862></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="title-box" data-v-826be862><div class="subtitle" data-v-826be862><!--[-->`);
      ssrRenderList(__props.data.topics, (topic) => {
        _push(ssrRenderComponent(TopicTag, { data: topic }, null, _parent));
      });
      _push(`<!--]--><div class="date" style="${ssrRenderStyle({ "margin-right": "30px" })}" data-v-826be862>\u53D1\u5E03\u4E8E${ssrInterpolate(unref(moment)(__props.data.createTime).calendar())}</div>`);
      if (__props.data.createTime != __props.data.updateTime) {
        _push(`<div class="date" data-v-826be862>${ssrInterpolate(unref(moment)(__props.data.updateTime).fromNow())}\u66F4\u65B0</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h1 class="title" data-v-826be862>${ssrInterpolate(__props.data.title)}</h1></div><div class="${ssrRenderClass([__props.data.cover && "has-cover", "container"])}" data-v-826be862><div style="${ssrRenderStyle({ "padding": "15px" })}" data-v-826be862>`);
      _push(ssrRenderComponent(_component_RichEditor, {
        value: __props.data.htmlContent,
        readonly: ""
      }, null, _parent));
      _push(`</div></div></div>`);
      if (unref(previewImg).show) {
        _push(`<div class="img-preview" data-v-826be862><img${ssrRenderAttr("src", unref(previewImg).url)} data-v-826be862></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/components/content.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comContent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-826be862"]]);

export { comContent as default };
//# sourceMappingURL=content-b3eab542.mjs.map
