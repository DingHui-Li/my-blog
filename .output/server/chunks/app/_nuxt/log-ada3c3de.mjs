import { useSSRContext, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { $ as $http } from '../server.mjs';
import moment from 'moment';
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

const _sfc_main = {
  __name: "log",
  __ssrInlineRender: true,
  setup(__props) {
    let list = ref([]);
    getList();
    setInterval(() => {
      getList();
    }, 5e3);
    function getList() {
      $http.get("/api/log", { size: 100 }).then((res) => {
        var _a;
        list.value = (_a = res == null ? void 0 : res.data) == null ? void 0 : _a.list;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "log-page" }, _attrs))} data-v-a71d3889><div class="title" data-v-a71d3889>\u8BBF\u95EE\u65E5\u5FD7</div><div class="list" data-v-a71d3889><!--[-->`);
      ssrRenderList(unref(list), (item) => {
        _push(`<div class="item" data-v-a71d3889><div class="ip" data-v-a71d3889>${ssrInterpolate(item.ip)}<div data-v-a71d3889>${ssrInterpolate(item.location)}</div></div><div class="url" data-v-a71d3889>${ssrInterpolate(item.url)}</div><div class="time" data-v-a71d3889>${ssrInterpolate(unref(moment)(item.time).calendar())}<div data-v-a71d3889>${ssrInterpolate(unref(moment)(item.time).format("YYYY-MM-DD HH:mm:ss"))}</div></div><div class="ua" data-v-a71d3889>${ssrInterpolate(item.ua)}</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/log.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const log = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a71d3889"]]);

export { log as default };
//# sourceMappingURL=log-ada3c3de.mjs.map
