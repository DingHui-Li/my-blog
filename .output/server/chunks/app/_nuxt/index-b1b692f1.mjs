import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { u as useRouter } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
import 'moment';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const list = [
      {
        name: "\u4EBA\u751F",
        icon: "dianzhentu",
        path: "/other/life"
      },
      {
        name: "\u8BBF\u5BA2",
        icon: "diqiu",
        path: "/other/visitor"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "other-page" }, _attrs))} data-v-2575ff33><div class="list" data-v-2575ff33><!--[-->`);
      ssrRenderList(list, (item) => {
        _push(`<div class="item" data-v-2575ff33><span class="${ssrRenderClass(`icon iconfont icon-${item.icon}`)}" data-v-2575ff33></span><div class="name" data-v-2575ff33>${ssrInterpolate(item.name)}</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/other/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2575ff33"]]);

export { index as default };
//# sourceMappingURL=index-b1b692f1.mjs.map
