import { ak as search_default, E as ElIcon } from '../server.mjs';
import { useSSRContext, ref, mergeProps, unref, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import comArticleItem from './articleItem-a78db4d1.mjs';
import comMomentItem from './momentItem-c635d0d5.mjs';
import comAlbumItem from './albumItem-d870c6bc.mjs';
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
import './topicTag-6bf7f71d.mjs';
import './Vimg-ab6caff9.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    ref({});
    let keyword = ref("");
    let result = ref([]);
    let loading = ref(false);
    let searched = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-page" }, _attrs))} data-v-c7c9093b><div class="search-box" data-v-c7c9093b><input class="input"${ssrRenderAttr("value", unref(keyword))} placeholder="\u8F93\u5165\u5173\u952E\u5B57" data-v-c7c9093b>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(search_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(search_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(result).length) {
        _push(`<div class="list" data-v-c7c9093b><div class="title" data-v-c7c9093b>\u641C\u7D22\u7ED3\u679C<!--[-->`);
        ssrRenderList(unref(result), (item, index2) => {
          _push(`<div class="${ssrRenderClass([_ctx.type, "item"])}" style="${ssrRenderStyle(`animation-delay:${index2 % 10 * 100}ms`)}" data-v-c7c9093b>`);
          if (item.type == "moment") {
            _push(ssrRenderComponent(unref(comMomentItem), { data: item }, null, _parent));
          } else if (item.type == "photo") {
            _push(ssrRenderComponent(unref(comAlbumItem), {
              showMonth: true,
              data: item
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(comArticleItem), { data: item }, null, _parent));
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && !unref(result).length && unref(searched)) {
        _push(`<div class="empty" data-v-c7c9093b>\u65E0\u7ED3\u679C</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c7c9093b"]]);

export { index as default };
//# sourceMappingURL=index-79fcff4b.mjs.map
