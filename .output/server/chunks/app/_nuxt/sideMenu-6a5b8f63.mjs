import { useSSRContext, computed, mergeProps, unref } from 'vue';
import { u as useRouter, ag as useSysStore } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "sideMenu",
  __ssrInlineRender: true,
  props: {
    "modelValue": {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: eimts }) {
    const props = __props;
    useRouter();
    const sys = useSysStore();
    const menuList = sys.sideMenu;
    let activeIndex = computed(() => {
      return menuList.findIndex((item) => item.key == props.modelValue);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "side-menu" }, _attrs))} data-v-139d09ba><div class="active-box" style="${ssrRenderStyle(`transform:translateY(${unref(activeIndex) * 50}px)`)}" data-v-139d09ba></div><!--[-->`);
      ssrRenderList(unref(menuList), (item) => {
        _push(`<div class="${ssrRenderClass([item.key == __props.modelValue && "active", "item"])}" data-v-139d09ba><div class="label" data-v-139d09ba>${ssrInterpolate(item.label)}</div></div>`);
      });
      _push(`<!--]--><div class="website-info" data-v-139d09ba><a href="https://github.com/DingHui-Li/my-blog" target="_blank" data-v-139d09ba>github</a></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/sideMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comSideMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-139d09ba"]]);

export { comSideMenu as default };
//# sourceMappingURL=sideMenu-6a5b8f63.mjs.map
