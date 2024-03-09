import { u as useRouter, s as storeToRefs, a as useSysStore, af as key_default, $ as $http, E as ElIcon } from '../server.mjs';
import { useSSRContext, defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, h } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { E as ElMessageBox } from './index-a983ad61.mjs';
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
import './el-overlay-5312b424.mjs';
import './focus-trap-ece0c384.mjs';
import '@ctrl/tinycolor';
import './index-336e6da5.mjs';
import '@vue/reactivity';
import './vnode-f2ede823.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const input = ref("");
    useRouter();
    const { globalSetting } = storeToRefs(useSysStore());
    const website = computed(() => globalSetting.value.website || {});
    function getTotpQr() {
      ElMessageBox.prompt("\u8BF7\u8F93\u5165\u540E\u53F0\u914D\u7F6E\u7684\u5BC6\u94A5", "\u7ED1\u5B9A", {
        confirmButtonText: "\u786E\u5B9A",
        cancelButtonText: "\u53D6\u6D88"
      }).then(({ value }) => {
        if (value) {
          $http.get("/api/getTOTPQR", { secret: value }).then((res) => {
            ElMessageBox({
              title: "\u7ED1\u5B9A\u52A8\u6001\u9A8C\u8BC1\u7801",
              message: h("div", null, [
                h("div", null, "\u4F7F\u7528Google Authenticator,Microsoft Authenticator\u7B492FA\u5BA2\u6237\u7AEF\u626B\u63CF\u4E8C\u7EF4\u7801"),
                res.data ? h("img", { style: "width:200px;height:auto;", src: res.data }, "VNode") : h("div", { style: "color:red;margin-top:30px" }, "\u83B7\u53D6\u4E8C\u7EF4\u7801\u5931\u8D25")
              ])
            });
          });
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-ee9888cc><div class="card" data-v-ee9888cc>`);
      if (unref(website).cover) {
        _push(`<img class="cover"${ssrRenderAttr("src", unref(website).cover)} alt="" data-v-ee9888cc>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="content" data-v-ee9888cc>`);
      _push(ssrRenderComponent(_component_el_icon, {
        class: "icon-key",
        size: "20",
        onClick: getTotpQr
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(key_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(key_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="title" data-v-ee9888cc>${ssrInterpolate(unref(website).name)}</div><div class="input-box" data-v-ee9888cc><input class="input" placeholder="\u8BF7\u8F93\u5165\u52A8\u6001\u9A8C\u8BC1\u7801"${ssrRenderAttr("value", unref(input))} data-v-ee9888cc></div><div class="${ssrRenderClass(["btn", unref(input).length != 6 && "disabled"])}" data-v-ee9888cc>\u9A8C\u8BC1</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee9888cc"]]);

export { login as default };
//# sourceMappingURL=login-b4aec166.mjs.map
