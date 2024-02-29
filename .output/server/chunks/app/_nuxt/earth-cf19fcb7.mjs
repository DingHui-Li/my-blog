import { useSSRContext, ref, mergeProps } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import * as THREE from 'three';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  __name: "earth",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    new THREE.WebGLRenderer({ alpha: true, antialias: true });
    new THREE.PerspectiveCamera(30, 1, 1, 3e3);
    new THREE.Scene();
    new THREE.Group();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "earth-container" }, _attrs))} data-v-20953be2><div class="earth" data-v-20953be2></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/other/visitor/components/earth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comEarth = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-20953be2"]]);

export { comEarth as default };
//# sourceMappingURL=earth-cf19fcb7.mjs.map
