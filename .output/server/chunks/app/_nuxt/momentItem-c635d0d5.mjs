import { _ as __nuxt_component_0 } from './Vimg-ab6caff9.mjs';
import { u as useRouter, ag as useSysStore, ah as location_filled_default, E as ElIcon } from '../server.mjs';
import { useSSRContext, mergeProps, unref, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import moment from 'moment';
import TopicTag from './topicTag-6bf7f71d.mjs';
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

const _sfc_main = {
  __name: "momentItem",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    useRouter();
    const sys = useSysStore();
    let profile = sys.globalSetting.profile;
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Vimg = __nuxt_component_0;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "moment-item" }, _attrs))} data-v-d1e4eef8><div class="avatar" data-v-d1e4eef8><img${ssrRenderAttr("src", ((_a = unref(profile)) == null ? void 0 : _a.avatar) + "?x-oss-process=image/resize,m_fill,w_100")} data-v-d1e4eef8></div><div class="right" data-v-d1e4eef8><div class="user-info" data-v-d1e4eef8><div class="name" data-v-d1e4eef8>${ssrInterpolate((_b = unref(profile)) == null ? void 0 : _b.name)}</div><div class="time" data-v-d1e4eef8>${ssrInterpolate(unref(moment)(__props.data.createTime).format("LLLL"))}</div></div><div class="content" data-v-d1e4eef8>${ssrInterpolate(__props.data.textContent)}</div><div class="topics" data-v-d1e4eef8><!--[-->`);
      ssrRenderList(__props.data.topics, (item) => {
        _push(ssrRenderComponent(TopicTag, { data: item }, null, _parent));
      });
      _push(`<!--]--></div><div class="imgs" data-v-d1e4eef8><!--[-->`);
      ssrRenderList(__props.data.imgs, (item, index) => {
        _push(ssrRenderComponent(_component_Vimg, {
          class: ["img", __props.data.imgs.length == 1 && "single"],
          style: `width:${__props.data.imgs.length == 1 ? 100 : __props.data.imgs.length == 2 ? 50 : 33.33}%;`,
          src: item,
          thumb: item + "?x-oss-process=image/resize,m_fill,w_400"
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="info" data-v-d1e4eef8>`);
      if (__props.data.location) {
        _push(`<div class="location" data-v-d1e4eef8>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(location_filled_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(location_filled_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span data-v-d1e4eef8>${ssrInterpolate(__props.data.location)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.data.weather) {
        _push(`<div class="weather" data-v-d1e4eef8>${ssrInterpolate(__props.data.weather.text)} ${ssrInterpolate(__props.data.weather.temp)}\xB0C</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/momentItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comMomentItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d1e4eef8"]]);

export { comMomentItem as default };
//# sourceMappingURL=momentItem-c635d0d5.mjs.map
