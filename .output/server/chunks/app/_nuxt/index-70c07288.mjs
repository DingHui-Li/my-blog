import { useSSRContext, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import comEarth from './earth-6d3aaf55.mjs';
import { $ as $http } from '../server.mjs';
import moment from 'moment';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'three';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    let list = ref([]);
    getList();
    setInterval(() => {
      getList();
    }, 5e3);
    function getList() {
      $http.get("/api/log?type=client", { size: 100 }).then((res) => {
        var _a;
        list.value = (_a = res == null ? void 0 : res.data) == null ? void 0 : _a.list;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "visitor-page" }, _attrs))} data-v-061c2ce3><div class="title" data-v-061c2ce3>\u8BBF\u95EE\u8BB0\u5F55</div>`);
      _push(ssrRenderComponent(comEarth, null, null, _parent));
      _push(`<div class="list" data-v-061c2ce3><!--[-->`);
      ssrRenderList(unref(list), (item) => {
        _push(`<div class="item" data-v-061c2ce3><div class="col ip" data-v-061c2ce3>${ssrInterpolate(item.ip)}<div data-v-061c2ce3>${ssrInterpolate(item.location)}</div></div><div class="col url" data-v-061c2ce3>${ssrInterpolate(item.url)}</div><div class="col time" data-v-061c2ce3>${ssrInterpolate(unref(moment)(item.time).calendar())}<div data-v-061c2ce3>${ssrInterpolate(unref(moment)(item.time).format("YYYY-MM-DD HH:mm:ss"))}</div></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/other/visitor/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-061c2ce3"]]);

export { index as default };
//# sourceMappingURL=index-70c07288.mjs.map
