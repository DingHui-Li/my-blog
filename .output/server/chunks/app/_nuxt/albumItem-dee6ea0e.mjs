import { useSSRContext, defineComponent, computed, unref } from 'vue';
import { u as useRouter, a as useSysStore } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import TopicTag from './topicTag-63c2ac32.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "albumItem",
  __ssrInlineRender: true,
  props: {
    data: {},
    showMonth: {},
    showYear: {}
  },
  setup(__props) {
    const props = __props;
    useRouter();
    const sys = useSysStore();
    sys.globalSetting.profile;
    let createTime = computed(() => new Date(Number(props.data.createTime)));
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.data.imgs.length) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-38d10bc2>`);
        if (_ctx.showYear) {
          _push(`<div class="year" data-v-38d10bc2>${ssrInterpolate(unref(createTime).getFullYear())}\u5E74</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="moment-item" data-v-38d10bc2><div class="month" data-v-38d10bc2>`);
        if (_ctx.showMonth) {
          _push(`<span data-v-38d10bc2>${ssrInterpolate(unref(createTime).getMonth() + 1)}\u6708</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="right" data-v-38d10bc2><div class="info" data-v-38d10bc2><div class="time" data-v-38d10bc2>${ssrInterpolate(unref(createTime).getDate())}\u65E5</div></div><div class="topics" data-v-38d10bc2><!--[-->`);
        ssrRenderList(_ctx.data.topics, (item) => {
          _push(ssrRenderComponent(TopicTag, { data: item }, null, _parent));
        });
        _push(`<!--]--></div><div class="imgs" data-v-38d10bc2><!--[-->`);
        ssrRenderList(_ctx.data.imgs, (item, index) => {
          _push(`<div class="img" data-v-38d10bc2><img${ssrRenderAttr("src", item + "?x-oss-process=image/resize,m_fill,w_400")} data-v-38d10bc2></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/albumItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comAlbumItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38d10bc2"]]);

export { comAlbumItem as default };
//# sourceMappingURL=albumItem-dee6ea0e.mjs.map
