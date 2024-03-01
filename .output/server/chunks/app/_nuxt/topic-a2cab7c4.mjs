import { b as ElButton } from './el-message-box-67dfa228.mjs';
import { a as ElTable, b as ElTableColumn, E as ElTag } from './el-tag-4957df45.mjs';
import { c as comAddTopic, E as ElImage } from './addTopic-6d47be96.mjs';
import { $ as $http, F as ElMessage } from '../server.mjs';
import { useSSRContext, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import moment from 'moment';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import { E as ElMessageBox } from './index-4df874b5.mjs';
import '@vueuse/core';
import 'lodash-unified';
import '@vue/shared';
import './focus-trap-37ab9995.mjs';
import '@ctrl/tinycolor';
import './el-scrollbar-bc1affbb.mjs';
import '@popperjs/core';
import 'escape-html';
import './el-popper-ee3eb919.mjs';
import 'normalize-wheel-es';
import './index-241b10ae.mjs';
import '@vue/reactivity';
import './vnode-f2ede823.mjs';
import './el-form-item-cb852777.mjs';
import 'async-validator';
import './upload-b00de2b0.mjs';
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

const _sfc_main = {
  __name: "topic",
  __ssrInlineRender: true,
  setup(__props) {
    let addDialogEl = ref();
    const cols = [
      // {
      //   label: "ID",
      //   key: "_id",
      // },
      {
        label: "\u4E3B\u9898",
        key: "name"
      },
      {
        label: "\u5C01\u9762",
        key: "cover"
      },
      {
        label: "\u521B\u5EFA\u65F6\u95F4",
        key: "createTime"
      }
    ];
    let list = ref([]);
    getList();
    function getList() {
      $http.get("/api/topic").then((res) => {
        list.value = res == null ? void 0 : res.data;
      });
    }
    function handleEdit(data, index) {
      addDialogEl.value.open(data);
    }
    function handleDelete(data, index) {
      ElMessageBox.confirm("\u662F\u5426\u5220\u9664", "Warning", {
        confirmButtonText: "\u5220\u9664",
        cancelButtonText: "\u53D6\u6D88",
        type: "warning"
      }).then(() => {
        $http.delete("/api/admin/topic/" + data._id).then((res) => {
          ElMessage({
            message: "\u5220\u9664\u6210\u529F",
            type: "success"
          });
          getList();
        });
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_image = ElImage;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topic-list-page" }, _attrs))} data-v-555aa7e6><div class="actions" data-v-555aa7e6>`);
      _push(ssrRenderComponent(unref(comAddTopic), {
        ref_key: "addDialogEl",
        ref: addDialogEl,
        onConfirm: getList
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              class: "btn",
              type: "primary",
              onClick: ($event) => _ctx.addFormDialog.show = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u6DFB\u52A0`);
                } else {
                  return [
                    createTextVNode("\u6DFB\u52A0")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                class: "btn",
                type: "primary",
                onClick: ($event) => _ctx.addFormDialog.show = true
              }, {
                default: withCtx(() => [
                  createTextVNode("\u6DFB\u52A0")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_table, {
        data: unref(list),
        stripe: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(cols, (col) => {
              _push2(ssrRenderComponent(_component_el_table_column, {
                prop: col.key,
                label: col.label
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (col.key == "createTime") {
                      _push3(`<span data-v-555aa7e6${_scopeId2}>${ssrInterpolate(unref(moment)(row.createTime).format("YYYY-MM-DD HH:mm"))}</span>`);
                    } else if (col.key == "name") {
                      _push3(ssrRenderComponent(_component_el_tag, null, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(row.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(row.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else if (col.key == "cover") {
                      _push3(ssrRenderComponent(_component_el_image, {
                        style: { "width": "30px" },
                        "preview-teleported": true,
                        src: row.cover,
                        "preview-src-list": [row.cover]
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<span data-v-555aa7e6${_scopeId2}>${ssrInterpolate(row[col.key])}</span>`);
                    }
                  } else {
                    return [
                      col.key == "createTime" ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(moment)(row.createTime).format("YYYY-MM-DD HH:mm")), 1)) : col.key == "name" ? (openBlock(), createBlock(_component_el_tag, { key: 1 }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.name), 1)
                        ]),
                        _: 2
                      }, 1024)) : col.key == "cover" ? (openBlock(), createBlock(_component_el_image, {
                        key: 2,
                        style: { "width": "30px" },
                        "preview-teleported": true,
                        src: row.cover,
                        "preview-src-list": [row.cover]
                      }, null, 8, ["src", "preview-src-list"])) : (openBlock(), createBlock("span", { key: 3 }, toDisplayString(row[col.key]), 1))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(_component_el_table_column, null, {
              default: withCtx(({ row, $index }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "danger",
                    text: "",
                    onClick: ($event) => handleDelete(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u5220\u9664`);
                      } else {
                        return [
                          createTextVNode("\u5220\u9664")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    text: "",
                    onClick: ($event) => handleEdit(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u7F16\u8F91`);
                      } else {
                        return [
                          createTextVNode("\u7F16\u8F91")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "danger",
                      text: "",
                      onClick: ($event) => handleDelete(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u5220\u9664")
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_el_button, {
                      type: "primary",
                      text: "",
                      onClick: ($event) => handleEdit(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7F16\u8F91")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(cols, (col) => {
                return createVNode(_component_el_table_column, {
                  prop: col.key,
                  label: col.label
                }, {
                  default: withCtx(({ row }) => [
                    col.key == "createTime" ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(moment)(row.createTime).format("YYYY-MM-DD HH:mm")), 1)) : col.key == "name" ? (openBlock(), createBlock(_component_el_tag, { key: 1 }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.name), 1)
                      ]),
                      _: 2
                    }, 1024)) : col.key == "cover" ? (openBlock(), createBlock(_component_el_image, {
                      key: 2,
                      style: { "width": "30px" },
                      "preview-teleported": true,
                      src: row.cover,
                      "preview-src-list": [row.cover]
                    }, null, 8, ["src", "preview-src-list"])) : (openBlock(), createBlock("span", { key: 3 }, toDisplayString(row[col.key]), 1))
                  ]),
                  _: 2
                }, 1032, ["prop", "label"]);
              }), 64)),
              createVNode(_component_el_table_column, null, {
                default: withCtx(({ row, $index }) => [
                  createVNode(_component_el_button, {
                    type: "danger",
                    text: "",
                    onClick: ($event) => handleDelete(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u5220\u9664")
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    text: "",
                    onClick: ($event) => handleEdit(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u7F16\u8F91")
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/topic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const topic = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-555aa7e6"]]);

export { topic as default };
//# sourceMappingURL=topic-a2cab7c4.mjs.map
