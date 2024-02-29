import { useSSRContext, defineComponent, mergeProps, unref } from 'vue';
import { u as useRouter } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import TopicTag from './topicTag-6bf7f71d.mjs';
import moment from 'moment';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "articleItem",
  __ssrInlineRender: true,
  props: {
    data: {}
  },
  setup(__props) {
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-item" }, _attrs))} data-v-665733ea><div class="content-box" data-v-665733ea><div class="title" data-v-665733ea>${ssrInterpolate(_ctx.data.title)}</div><div class="subtitle" data-v-665733ea><!--[-->`);
      ssrRenderList(_ctx.data.topics, (topic) => {
        _push(ssrRenderComponent(TopicTag, { data: topic }, null, _parent));
      });
      _push(`<!--]--><div class="date" data-v-665733ea>${ssrInterpolate(unref(moment)(Number(_ctx.data.updateTime)).fromNow())}</div></div><div class="desc" data-v-665733ea>${ssrInterpolate(_ctx.data.desc)}...</div></div>`);
      if (_ctx.data.cover) {
        _push(`<img class="cover"${ssrRenderAttr("src", `${_ctx.data.cover}?x-oss-process=image/resize,m_fill,w_400`)} data-v-665733ea>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/articleItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comArticleItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-665733ea"]]);

export { comArticleItem as default };
//# sourceMappingURL=articleItem-a78db4d1.mjs.map
