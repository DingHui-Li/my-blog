import { u as useRouter, R as arrow_left_default, S as arrow_right_default, E as ElIcon } from '../server.mjs';
import { useSSRContext, ref, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Controller } from 'swiper';
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
  __name: "topicList",
  __ssrInlineRender: true,
  props: {
    topics: Array
  },
  setup(__props) {
    const router = useRouter();
    const controlledSwiper = ref(null);
    let slidesPerView = ref(6);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topic-list" }, _attrs))} data-v-9c1d13f6><div class="header" data-v-9c1d13f6><div class="title" data-v-9c1d13f6>\u4E3B\u9898\u5217\u8868</div>`);
      if (__props.topics.length > unref(slidesPerView)) {
        _push(`<div class="pagation" data-v-9c1d13f6><div class="btn" data-v-9c1d13f6>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(arrow_left_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(arrow_left_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="btn" data-v-9c1d13f6>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(arrow_right_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="list" data-v-9c1d13f6>`);
      _push(ssrRenderComponent(unref(Swiper), {
        modules: [unref(FreeMode), unref(Controller)],
        freeMode: true,
        slidesPerView: unref(slidesPerView),
        "space-between": 10,
        onSwiper: (e) => controlledSwiper.value = e
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.topics, (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                height: "250px",
                style: { "border-radius": "10px", "overflow": "hidden" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="topic" data-v-9c1d13f6${_scopeId2}><img class="img" draggable="false"${ssrRenderAttr("src", `${item.cover}?x-oss-process=image/resize,m_fill,w_600`)} data-v-9c1d13f6${_scopeId2}><div class="content" data-v-9c1d13f6${_scopeId2}><div class="title" data-v-9c1d13f6${_scopeId2}>${ssrInterpolate(item.name)}</div></div></div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: "topic",
                        ref_for: true,
                        ref: "topicEls",
                        onClick: ($event) => unref(router).push(`/topic/${item._id}`)
                      }, [
                        createVNode("img", {
                          class: "img",
                          draggable: "false",
                          src: `${item.cover}?x-oss-process=image/resize,m_fill,w_600`
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "content" }, [
                          createVNode("div", { class: "title" }, toDisplayString(item.name), 1)
                        ])
                      ], 8, ["onClick"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.topics, (item) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  height: "250px",
                  style: { "border-radius": "10px", "overflow": "hidden" }
                }, {
                  default: withCtx(() => [
                    createVNode("div", {
                      class: "topic",
                      ref_for: true,
                      ref: "topicEls",
                      onClick: ($event) => unref(router).push(`/topic/${item._id}`)
                    }, [
                      createVNode("img", {
                        class: "img",
                        draggable: "false",
                        src: `${item.cover}?x-oss-process=image/resize,m_fill,w_600`
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "content" }, [
                        createVNode("div", { class: "title" }, toDisplayString(item.name), 1)
                      ])
                    ], 8, ["onClick"])
                  ]),
                  _: 2
                }, 1024);
              }), 256))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/topicList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const topicList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9c1d13f6"]]);

export { topicList as default };
//# sourceMappingURL=topicList-2bad2af7.mjs.map
