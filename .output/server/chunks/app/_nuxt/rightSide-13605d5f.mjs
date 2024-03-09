import { useSSRContext, ref, watch, unref, mergeProps } from 'vue';
import { u as useRouter, $ as $http } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import TopicTag from './topicTag-fe971a5f.mjs';
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

const _sfc_main = {
  __name: "rightSide",
  __ssrInlineRender: true,
  props: {
    topics: Array,
    aid: String
  },
  setup(__props) {
    const props = __props;
    useRouter();
    let list = ref([]);
    watch(
      () => props.topics,
      () => {
        getList();
      }
    );
    function getList() {
      var _a, _b;
      $http.get(`/api/article/${props.aid}/same`, {
        topics: (_b = (_a = props == null ? void 0 : props.topics) == null ? void 0 : _a.map((item) => item._id)) == null ? void 0 : _b.join(",")
      }).then((res) => {
        list.value = res.data;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(list).length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "right-side" }, _attrs))} data-v-e3b44145><div class="title" data-v-e3b44145>\u76F8\u4F3C\u6587\u7AE0</div><!--[-->`);
        ssrRenderList(unref(list), (item) => {
          _push(`<div class="item" data-v-e3b44145><img class="cover"${ssrRenderAttr("src", `${item.cover}?x-oss-process=image/resize,m_fill,w_400`)} data-v-e3b44145><div class="content" data-v-e3b44145><div class="subtitle" data-v-e3b44145><!--[-->`);
          ssrRenderList(item.topics, (topic) => {
            _push(ssrRenderComponent(TopicTag, { data: topic }, null, _parent));
          });
          _push(`<!--]--><div class="date" data-v-e3b44145>${ssrInterpolate(unref(moment)(item.updateTime).fromNow())}</div></div><div class="title" data-v-e3b44145>${ssrInterpolate(item.title)}</div><div class="desc" data-v-e3b44145>${ssrInterpolate(item.desc)}...</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/components/rightSide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const rightSide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e3b44145"]]);

export { rightSide as default };
//# sourceMappingURL=rightSide-13605d5f.mjs.map
