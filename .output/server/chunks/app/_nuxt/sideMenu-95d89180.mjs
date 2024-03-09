import { useSSRContext, computed, mergeProps, unref } from 'vue';
import { u as useRouter, s as storeToRefs, a as useSysStore } from '../server.mjs';
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
    const { sideMenu: menuList } = storeToRefs(useSysStore());
    let activeIndex = computed(() => {
      return menuList.value.findIndex((item) => item.key == props.modelValue);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "side-menu" }, _attrs))} data-v-d8823028><div class="active-box" style="${ssrRenderStyle(`transform:translateY(${unref(activeIndex) * 51}px)`)}" data-v-d8823028></div><!--[-->`);
      ssrRenderList(unref(menuList), (item) => {
        _push(`<div class="${ssrRenderClass([item.key == __props.modelValue && "active", "item"])}" data-v-d8823028><div class="label" data-v-d8823028>${ssrInterpolate(item.label)}</div></div>`);
      });
      _push(`<!--]--><div class="website-info" data-v-d8823028><a href="https://github.com/DingHui-Li/my-blog" target="_blank" data-v-d8823028>Github</a></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/sideMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comSideMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d8823028"]]);

export { comSideMenu as default };
//# sourceMappingURL=sideMenu-95d89180.mjs.map
