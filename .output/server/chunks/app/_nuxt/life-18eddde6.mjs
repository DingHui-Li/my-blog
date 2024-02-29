import { ag as useSysStore } from '../server.mjs';
import { useSSRContext, ref, computed, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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

const totalDays = 365 * 80;
const _sfc_main = {
  __name: "life",
  __ssrInlineRender: true,
  setup(__props) {
    const sysStore = useSysStore();
    const birthday = new Date(sysStore.globalSetting.profile.birthday);
    let lifeTime = ref(0);
    setInterval(() => {
      lifeTime.value = ((/* @__PURE__ */ new Date()).getTime() - birthday.getTime()) / 1e3;
    }, 1e3);
    let lifeDays = computed(() => {
      return lifeTime.value / 86400;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "life-page" }, _attrs))} data-v-78121d0d><div class="title" data-v-78121d0d>\u4EBA\u751F\u4E0D\u8FC730000\u5929\uFF0C\u5982\u767D\u9A79\u8FC7\u9699\uFF0C\u8BF7\u53CA\u65F6\u884C\u4E50</div><div class="title" data-v-78121d0d>\u73B0\u5728\u5DF2\u7ECF<div class="num" data-v-78121d0d>${ssrInterpolate((unref(lifeDays) / 365).toFixed(8))}</div><span data-v-78121d0d>\u5C81\u4E86</span></div><div class="text" data-v-78121d0d>\u5B58\u5728\u4E8E\u4E16\u754C\u4E0A</div><div class="detail" data-v-78121d0d><div class="item" data-v-78121d0d>${ssrInterpolate(parseInt(unref(lifeTime) / (86400 * 365)))} <div class="label" data-v-78121d0d>\u5E74</div></div><div class="item" data-v-78121d0d>${ssrInterpolate(parseInt(unref(lifeTime) / 86400 / 30))} <div class="label" data-v-78121d0d>\u6708</div></div><div class="item" data-v-78121d0d>${ssrInterpolate(parseInt(unref(lifeTime) / 86400))} <div class="label" data-v-78121d0d>\u5929</div></div><div class="item" data-v-78121d0d>${ssrInterpolate(parseInt(unref(lifeTime) / 3600))} <div class="label" data-v-78121d0d>\u5C0F\u65F6</div></div><div class="item" data-v-78121d0d>${ssrInterpolate(parseInt(unref(lifeTime) / 60))} <div class="label" data-v-78121d0d>\u5206\u949F</div></div><div class="item" data-v-78121d0d>${ssrInterpolate(parseInt(unref(lifeTime)))} <div class="label" data-v-78121d0d>\u79D2</div></div></div>`);
      if (unref(lifeDays)) {
        _push(`<div class="table" data-v-78121d0d><!--[-->`);
        ssrRenderList(totalDays, (item) => {
          _push(`<div class="${ssrRenderClass([item < unref(lifeDays) && "gone", "cell"])}" data-v-78121d0d></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/other/life.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const life = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-78121d0d"]]);

export { life as default };
//# sourceMappingURL=life-18eddde6.mjs.map
