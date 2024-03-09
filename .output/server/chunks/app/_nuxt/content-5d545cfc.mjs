import { useSSRContext, ref, mergeProps, unref } from 'vue';
import { u as useRouter, ac as useRoute, $ as $http } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
import comArticleItem from './articleItem-65410d40.mjs';
import comMomentItem from './momentItem-f59baa93.mjs';
import comAlbumItem from './albumItem-c99374d7.mjs';
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
import './topicTag-fe971a5f.mjs';
import './Vimg-ab6caff9.mjs';

const _sfc_main = {
  __name: "content",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    let pagation = ref({
      page: 1,
      size: 10,
      loading: false,
      isMore: true
    });
    let list = ref([]);
    getList();
    function getList(page = 1) {
      if (pagation.value.loading)
        return;
      console.log("get list");
      pagation.value.loading = true;
      if (page == 1) {
        list.value = [];
      }
      $http.get("/api/article", {
        page,
        size: pagation.value.size,
        topic: route.params.id
      }).then((res) => {
        var _a;
        if ((_a = res.data.list) == null ? void 0 : _a.length) {
          list.value = [...list.value, ...res.data.list];
          pagation.value.page = page;
          pagation.value.isMore = page * pagation.value.size < res.data.total;
        }
      }).finally(() => {
        pagation.value.isMore = false;
        pagation.value.loading = false;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-container" }, _attrs))} data-v-d96c2655><div class="list" data-v-d96c2655><!--[-->`);
      ssrRenderList(unref(list), (item, index) => {
        _push(`<div class="${ssrRenderClass([_ctx.type, "item"])}" style="${ssrRenderStyle(`animation-delay:${index % 10 * 100}ms`)}" data-v-d96c2655>`);
        if (item.type == "moment") {
          _push(ssrRenderComponent(unref(comMomentItem), { data: item }, null, _parent));
        } else if (item.type == "photo") {
          _push(ssrRenderComponent(unref(comAlbumItem), {
            showMonth: true,
            data: item
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(comArticleItem), { data: item }, null, _parent));
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (!unref(list).length & !unref(pagation).loading) {
        _push(`<div class="empty" data-v-d96c2655>\u65E0\u6570\u636E</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/topic/components/content.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Content = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d96c2655"]]);

export { Content as default };
//# sourceMappingURL=content-5d545cfc.mjs.map
