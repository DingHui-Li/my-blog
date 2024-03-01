import { useSSRContext, ref, mergeProps, unref } from 'vue';
import { aa as useRoute, $ as $http } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import comContent from './content-a51776ab.mjs';
import comPhotoAlbum from './photoAlbum-d7ed9549.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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
import 'mongoose';
import 'ali-oss';
import 'crypto';
import 'request';
import 'zlib';
import 'vue-router';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
import 'moment';
import './RichEditor-c53030c3.mjs';
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
import './index-4df874b5.mjs';
import './el-message-box-67dfa228.mjs';
import './focus-trap-37ab9995.mjs';
import '@ctrl/tinycolor';
import './index-241b10ae.mjs';
import '@vue/reactivity';
import './vnode-f2ede823.mjs';
import './topicTag-6bf7f71d.mjs';
import './Vimg-ab6caff9.mjs';
import 'exifr';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    let detail = ref({});
    getArticle();
    function getArticle() {
      $http.get(`/api/article/${route.params.id}`).then((res) => {
        var _a, _b;
        res.data.htmlContent = (_b = (_a = res.data) == null ? void 0 : _a.htmlContent) == null ? void 0 : _b.replaceAll(
          "<img",
          '<img class="content-img" style="max-width:100%;cursor:zoom-in"'
        );
        detail.value = res == null ? void 0 : res.data;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article" }, _attrs))} data-v-8ce61839><div class="content" data-v-8ce61839>`);
      if (unref(detail).type == "article") {
        _push(ssrRenderComponent(comContent, { data: unref(detail) }, null, _parent));
      } else {
        _push(ssrRenderComponent(comPhotoAlbum, { data: unref(detail) }, null, _parent));
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8ce61839"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-35fcf46e.mjs.map
