import { useSSRContext, ref, mergeProps, unref } from 'vue';
import { ac as useRoute, $ as $http } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import Content from './content-5d545cfc.mjs';
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
import './articleItem-65410d40.mjs';
import './topicTag-fe971a5f.mjs';
import './momentItem-f59baa93.mjs';
import './Vimg-ab6caff9.mjs';
import './albumItem-c99374d7.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    let topicDetail = ref({});
    getTopic();
    function getTopic() {
      $http.get(`/api/topic/${route.params.id}`).then((res) => {
        topicDetail.value = res.data;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topic" }, _attrs))} data-v-7c854594><div class="cover" data-v-7c854594><img${ssrRenderAttr("src", unref(topicDetail).cover)} data-v-7c854594><div class="mask" data-v-7c854594></div><div class="name" data-v-7c854594>${ssrInterpolate(unref(topicDetail).name)}</div></div><div class="container" data-v-7c854594><div class="content" data-v-7c854594>`);
      _push(ssrRenderComponent(Content, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/topic/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7c854594"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-447e458f.mjs.map
