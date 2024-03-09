import { useSSRContext, ref, mergeProps, unref } from 'vue';
import { ac as useRoute, u as useRouter, $ as $http } from '../server.mjs';
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

const _sfc_main = {
  __name: "leftSide",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    let topics = ref([]);
    getTopicList();
    function getTopicList() {
      $http.get("/api/topic").then((res) => {
        topics.value = res == null ? void 0 : res.data;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "left-side" }, _attrs))} data-v-258bfb7c><div class="other-topics" data-v-258bfb7c><div class="title" data-v-258bfb7c>\u4E3B\u9898\u5217\u8868</div><div class="list" data-v-258bfb7c><!--[-->`);
      ssrRenderList(unref(topics), (item) => {
        _push(`<div class="${ssrRenderClass([item._id == unref(route).params.id && "active", "topic"])}" data-v-258bfb7c>${ssrInterpolate(item.name)}</div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/topic/components/leftSide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const leftSide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-258bfb7c"]]);

export { leftSide as default };
//# sourceMappingURL=leftSide-a29ddf30.mjs.map
