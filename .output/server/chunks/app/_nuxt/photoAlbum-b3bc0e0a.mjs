import { _ as __nuxt_component_0 } from './Vimg-ab6caff9.mjs';
import { useSSRContext, ref, watch, nextTick, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import moment from 'moment';
import TopicTag from './topicTag-fe971a5f.mjs';
import EXIF from 'exifr';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import '../server.mjs';
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
  __name: "photoAlbum",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    let exifList = ref([]);
    let imgsEl = ref([]);
    watch(() => props.data, (v) => {
      console.log(v);
      nextTick(() => {
        var _a;
        (_a = props.data.imgs) == null ? void 0 : _a.forEach((item, index) => {
          item = item.replace("http:", "https:");
          EXIF.parse(item, ["CreateDate", "Make", "LensModel", "Model", "FocalLengthIn35mmFormat", "FNumber", "ExposureTime", "ISO"]).then((res) => {
            exifList.value[index] = res;
          });
        });
      });
    });
    function getShotInfo(info) {
      var _a;
      if (!info.FocalLengthIn35mmFormat) {
        return "";
      }
      return `${info.FocalLengthIn35mmFormat}mm  f/${info.FNumber}  ${(_a = info.ExposureTime) == null ? void 0 : _a.toFixed(2)}s  ISO${info.ISO}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Vimg = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "photo-album" }, _attrs))} data-v-99dd0601><div class="header" data-v-99dd0601><div class="title" data-v-99dd0601>${ssrInterpolate(__props.data.title)}</div><div class="num" data-v-99dd0601>\u5171${ssrInterpolate((_a = __props.data.imgs) == null ? void 0 : _a.length)}\u5F20\u7167\u7247</div><!--[-->`);
      ssrRenderList(__props.data.topics, (topic) => {
        _push(ssrRenderComponent(TopicTag, { data: topic }, null, _parent));
      });
      _push(`<!--]--><div class="date" data-v-99dd0601>\u53D1\u5E03\u4E8E ${ssrInterpolate(unref(moment)(__props.data.createTime).calendar())}</div>`);
      if (__props.data.createTime != __props.data.updateTime) {
        _push(`<div class="date" data-v-99dd0601>${ssrInterpolate(unref(moment)(__props.data.updateTime).fromNow())}\u66F4\u65B0</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="content" data-v-99dd0601>${ssrInterpolate(__props.data.textContent)}</div><div class="imgs" data-v-99dd0601><!--[-->`);
      ssrRenderList(__props.data.imgs, (item, index) => {
        _push(`<div class="item" data-v-99dd0601><div class="img" data-v-99dd0601>`);
        _push(ssrRenderComponent(_component_Vimg, {
          ref_for: true,
          ref_key: "imgsEl",
          ref: imgsEl,
          "preview-teleported": true,
          src: item,
          thumb: item + "?x-oss-process=image/resize,m_fill,w_1000"
        }, null, _parent));
        if (unref(exifList)[index]) {
          _push(`<div class="info" data-v-99dd0601><div class="text left" data-v-99dd0601>${ssrInterpolate(unref(exifList)[index].Make || "")} ${ssrInterpolate(unref(exifList)[index].Model || "")}<div class="date" data-v-99dd0601>${ssrInterpolate(unref(moment)(unref(exifList)[index].CreateDate || "").format("YYYY/MM/DD HH:mm"))}</div></div><div class="text right" data-v-99dd0601><div class="shot" data-v-99dd0601>${ssrInterpolate(getShotInfo(unref(exifList)[index]))}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/components/photoAlbum.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comPhotoAlbum = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-99dd0601"]]);

export { comPhotoAlbum as default };
//# sourceMappingURL=photoAlbum-b3bc0e0a.mjs.map
