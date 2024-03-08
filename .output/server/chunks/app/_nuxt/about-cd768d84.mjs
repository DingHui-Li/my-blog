import { _ as __nuxt_component_0 } from './RichEditor-3d1c0316.mjs';
import { a as useSysStore, $ as $http } from '../server.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
import './index-f1e731da.mjs';
import './el-overlay-bc767945.mjs';
import '@vueuse/core';
import 'lodash-unified';
import '@vue/shared';
import './focus-trap-249eac07.mjs';
import '@ctrl/tinycolor';
import './index-3d6192ff.mjs';
import '@vue/reactivity';
import './vnode-f2ede823.mjs';
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
import 'moment';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const website = useSysStore().globalSetting.website;
    const aboutmeArticle = ref();
    const aboutArticle = ref();
    if (website.about) {
      $http.get(`/api/article/${website.about}`).then((res) => {
        aboutArticle.value = res.data;
      });
    }
    if (website.aboutme) {
      $http.get(`/api/article/${website.aboutme}`).then((res) => {
        aboutmeArticle.value = res.data;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_RichEditor = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-page" }, _attrs))} data-v-29f5ba15><h2 data-v-29f5ba15>\u5173\u4E8E\u6211</h2>`);
      if ((_a = unref(aboutmeArticle)) == null ? void 0 : _a._id) {
        _push(`<div class="content" data-v-29f5ba15>`);
        _push(ssrRenderComponent(_component_RichEditor, {
          value: (_c = (_b = unref(aboutmeArticle)) == null ? void 0 : _b.htmlContent) == null ? void 0 : _c.toString(),
          readonly: ""
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="divider" data-v-29f5ba15></div><h2 data-v-29f5ba15>\u5173\u4E8E\u672C\u7AD9</h2>`);
      if ((_d = unref(aboutArticle)) == null ? void 0 : _d._id) {
        _push(`<div class="content" data-v-29f5ba15>`);
        _push(ssrRenderComponent(_component_RichEditor, {
          value: (_f = (_e = unref(aboutArticle)) == null ? void 0 : _e.htmlContent) == null ? void 0 : _f.toString(),
          readonly: ""
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-29f5ba15"]]);

export { about as default };
//# sourceMappingURL=about-cd768d84.mjs.map
