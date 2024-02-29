import { u as useRouter, aa as useRoute, ag as useSysStore, an as menu_default, ak as search_default, E as ElIcon } from '../server.mjs';
import { ref, mergeProps, isRef, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import comSideMenu from './sideMenu-6a5b8f63.mjs';
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
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    const sys = useSysStore();
    let website = sys.globalSetting.website;
    let showSideMenu = ref(false);
    let type = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout" }, _attrs))} data-v-d6b9be82><div class="topbar-container" data-v-d6b9be82><div class="topbar" data-v-d6b9be82>`);
      _push(ssrRenderComponent(_component_el_icon, {
        class: "menu",
        size: 20,
        onClick: ($event) => isRef(showSideMenu) ? showSideMenu.value = !unref(showSideMenu) : showSideMenu = !unref(showSideMenu)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(menu_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(menu_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="host" data-v-d6b9be82>${ssrInterpolate((_a = unref(website)) == null ? void 0 : _a.name)}</div>`);
      if (unref(route).name != "search") {
        _push(`<div class="search" data-v-d6b9be82><div class="placeholder" data-v-d6b9be82>\u641C\u7D22</div>`);
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
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="content-container" data-v-d6b9be82><div class="${ssrRenderClass([`${unref(showSideMenu) && "show"}`, "side"])}" data-v-d6b9be82>`);
      _push(ssrRenderComponent(comSideMenu, {
        modelValue: unref(type),
        "onUpdate:modelValue": ($event) => isRef(type) ? type.value = $event : type = $event
      }, null, _parent));
      _push(`</div><div class="content" data-v-d6b9be82>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d6b9be82"]]);

export { _default as default };
//# sourceMappingURL=default-1838023c.mjs.map
