import { useSSRContext, defineComponent, ref, watch, unref, mergeProps } from 'vue';
import { ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderComponent, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import { ag as useSysStore, aa as useRoute, $ as $http } from '../server.mjs';
import comArticleItem from './articleItem-a78db4d1.mjs';
import comMomentItem from './momentItem-c635d0d5.mjs';
import comAlbumItem from './albumItem-d870c6bc.mjs';
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
import './topicTag-6bf7f71d.mjs';
import './Vimg-ab6caff9.mjs';

const _sfc_main$1 = {
  __name: "LoadMore",
  __ssrInlineRender: true,
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    hasMore: {
      type: Boolean,
      default: false
    }
  },
  emits: ["loadMore"],
  setup(__props, { emit: emits }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "load-more" }, _attrs))} data-v-9e326d55>${ssrInterpolate(__props.loading ? "\u52A0\u8F7D\u4E2D" : __props.hasMore ? "\u52A0\u8F7D\u66F4\u591A" : "\u6CA1\u6709\u66F4\u591A\u4E86")}</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoadMore.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9e326d55"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const sys = useSysStore();
    let website = sys.globalSetting.website;
    const route = useRoute();
    let type = ref((_a = route.hash) == null ? void 0 : _a.replace("#", ""));
    let list = ref([]);
    const pagination = ref({
      loading: false,
      hasMore: false,
      page: 1,
      size: 10
    });
    watch(() => route.hash, (v) => {
      type.value = v == null ? void 0 : v.replace("#", "");
      getArticleList();
    }, { immediate: true });
    function loadMore() {
      console.log("loadMore");
      getArticleList(pagination.value.page + 1);
    }
    function getArticleList(page = 1) {
      if (page == 1) {
        list.value = [];
      }
      pagination.value.loading = true;
      $http.get(
        "/api/article",
        {
          type: type.value || "moment",
          page,
          size: pagination.value.size
        }
      ).then(({ data: res }) => {
        let t = res.list;
        if (type.value == "photo") {
          t = t.filter((item) => item.imgs.length > 0);
        }
        t = t == null ? void 0 : t.map((item, index2) => {
          item.createTimeObj = new Date(Number(item.createTime));
          return item;
        });
        list.value = [...list.value, ...t];
        pagination.value = {
          ...pagination.value,
          page,
          hasMore: res.page * res.size < res.total
        };
      }).finally(() => {
        pagination.value.loading = false;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadMore = __nuxt_component_0;
      _push(`<!--[-->`);
      if (unref(website).cover) {
        _push(`<div class="cover" data-v-53adb2e3><img${ssrRenderAttr("src", unref(website).cover)} data-v-53adb2e3></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="home" data-v-53adb2e3><!--[-->`);
      ssrRenderList(unref(list), (item, index2) => {
        var _a2, _b, _c, _d, _e, _f, _g;
        _push(`<div class="${ssrRenderClass([unref(type), "item"])}" style="${ssrRenderStyle(`animation-delay:${index2 % 10 * 100}ms`)}" data-v-53adb2e3>`);
        if (unref(type) == "photo") {
          _push(ssrRenderComponent(comAlbumItem, {
            data: item,
            showYear: index2 == 0 || ((_a2 = item.createTimeObj) == null ? void 0 : _a2.getFullYear()) != ((_c = (_b = unref(list)[index2 - 1]) == null ? void 0 : _b.createTimeObj) == null ? void 0 : _c.getFullYear()),
            showMonth: index2 == 0 || ((_d = item.createTimeObj) == null ? void 0 : _d.getFullYear()) != ((_e = unref(list)[index2 - 1].createTimeObj) == null ? void 0 : _e.getFullYear()) || ((_f = item.createTimeObj) == null ? void 0 : _f.getMonth()) != ((_g = unref(list)[index2 - 1].createTimeObj) == null ? void 0 : _g.getMonth())
          }, null, _parent));
        } else if (item.type == "moment") {
          _push(ssrRenderComponent(comMomentItem, { data: item }, null, _parent));
        } else {
          _push(ssrRenderComponent(comArticleItem, { data: item }, null, _parent));
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_LoadMore, {
        loading: unref(pagination).loading,
        "has-more": unref(pagination).hasMore,
        onLoadMore: loadMore
      }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53adb2e3"]]);

export { index as default };
//# sourceMappingURL=index-0b0cd3f1.mjs.map
