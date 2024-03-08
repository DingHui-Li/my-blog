import { $ as $http, ai as success_filled_default, aj as circle_check_default, E as ElIcon } from '../server.mjs';
import { useSSRContext, ref, mergeProps, unref, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "topics",
  __ssrInlineRender: true,
  emits: ["selected"],
  setup(__props, { emit: emits }) {
    const selected = ref({});
    let topics2 = ref([]);
    getTopicList();
    function getTopicList() {
      $http.get("/api/topic").then((res) => {
        topics2.value = res == null ? void 0 : res.data;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topics" }, _attrs))} data-v-706a6466><div class="title" data-v-706a6466>\u9009\u62E9\u4E3B\u9898\uFF08\u591A\u9009\uFF09</div><div class="list" data-v-706a6466><!--[-->`);
      ssrRenderList(unref(topics2), (item) => {
        _push(`<div class="item" data-v-706a6466><img class="bg"${ssrRenderAttr("src", `${item.cover}?x-oss-process=image/resize,m_fill,w_500`)} data-v-706a6466><div class="name" data-v-706a6466>${ssrInterpolate(item.name)}</div>`);
        if (unref(selected)[item._id]) {
          _push(ssrRenderComponent(_component_el_icon, { class: "selected" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(success_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(success_filled_default))
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_el_icon, {
            class: "selected",
            style: { "color": "#fff" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(circle_check_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(circle_check_default))
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search/components/topics.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const topics = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-706a6466"]]);

export { topics as default };
//# sourceMappingURL=topics-89d6eab9.mjs.map
