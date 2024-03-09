import { useSSRContext, mergeProps } from 'vue';
import { u as useRouter, ac as useRoute } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "topicTag",
  __ssrInlineRender: true,
  props: {
    data: Object,
    clickable: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    useRouter();
    useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topic-tag" }, _attrs))} data-v-65dfb257>#${ssrInterpolate(__props.data.name)}</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/topicTag.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TopicTag = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-65dfb257"]]);

export { TopicTag as default };
//# sourceMappingURL=topicTag-fe971a5f.mjs.map
