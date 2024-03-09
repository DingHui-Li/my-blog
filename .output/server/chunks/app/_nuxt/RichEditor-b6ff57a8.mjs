import { useSSRContext, defineComponent, watch, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, resolveComponent, withDirectives, vModelSelect } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Editor, VueNodeViewRenderer, EditorContent, BubbleMenu, NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import { createLowlight } from 'lowlight';
import FileHandler from '@tiptap-pro/extension-file-handler';
import Image from '@tiptap/extension-image';
import { u as uploadImage } from './upload-b00de2b0.mjs';
import { E as ElMessageBox } from './index-a983ad61.mjs';

const _sfc_main$1 = {
  components: {
    NodeViewWrapper,
    NodeViewContent
  },
  props: nodeViewProps,
  data() {
    return {
      languages: this.extension.options.lowlight.listLanguages()
    };
  },
  computed: {
    selectedLanguage: {
      get() {
        return this.node.attrs.language;
      },
      set(language) {
        this.updateAttributes({ language });
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_node_view_wrapper = resolveComponent("node-view-wrapper");
  const _component_node_view_content = resolveComponent("node-view-content");
  _push(ssrRenderComponent(_component_node_view_wrapper, mergeProps({ class: "code-block" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<select contenteditable="false"${_scopeId}><option${ssrRenderAttr("value", null)}${_scopeId}> auto </option><option disabled${_scopeId}> \u2014 </option><!--[-->`);
        ssrRenderList($data.languages, (language, index) => {
          _push2(`<option${ssrRenderAttr("value", language)}${_scopeId}>${ssrInterpolate(language)}</option>`);
        });
        _push2(`<!--]--></select><pre${_scopeId}><code${_scopeId}>`);
        _push2(ssrRenderComponent(_component_node_view_content, null, null, _parent2, _scopeId));
        _push2(`</code></pre>`);
      } else {
        return [
          withDirectives(createVNode("select", {
            contenteditable: "false",
            "onUpdate:modelValue": ($event) => $options.selectedLanguage = $event
          }, [
            createVNode("option", { value: null }, " auto "),
            createVNode("option", { disabled: "" }, " \u2014 "),
            (openBlock(true), createBlock(Fragment, null, renderList($data.languages, (language, index) => {
              return openBlock(), createBlock("option", {
                value: language,
                key: index
              }, toDisplayString(language), 9, ["value"]);
            }), 128))
          ], 8, ["onUpdate:modelValue"]), [
            [vModelSelect, $options.selectedLanguage]
          ]),
          createVNode("pre", null, [
            createVNode("code", null, [
              createVNode(_component_node_view_content)
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/codeBlockComponent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CodeBlockComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RichEditor",
  __ssrInlineRender: true,
  props: {
    value: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const lowlight = createLowlight({ html, css, js, ts });
    __expose({
      getPureText,
      getHtmlContent
    });
    const aligns = [
      {
        label: "\u5DE6\u5BF9\u9F50",
        value: "left"
      },
      {
        label: "\u5C45\u4E2D",
        value: "center"
      },
      {
        label: "\u53F3\u5BF9\u9F50",
        value: "right"
      }
    ];
    let editor = new Editor({
      editable: !props.readonly,
      extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Image,
        Highlight,
        Link.configure({}),
        TextAlign.configure({
          types: ["heading", "paragraph"]
        }),
        FileHandler.configure({
          allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
          onDrop: onFileDrop,
          onPaste: onFilePaste
        }),
        CodeBlockLowlight.extend({
          addNodeView() {
            return VueNodeViewRenderer(CodeBlockComponent);
          }
        }).configure({ lowlight })
      ]
    });
    watch(() => props.value, (v) => {
      if (editor) {
        editor.commands.insertContent(v);
      }
    }, { immediate: true });
    function getPureText() {
      return editor.getText();
    }
    function getHtmlContent() {
      return editor.getHTML();
    }
    function onFileDrop(currentEditor, files, pos) {
      files.forEach((file) => {
        uploadImage(file, "article").then((url) => {
          currentEditor.chain().insertContentAt(pos, {
            type: "image",
            attrs: {
              src: url
            }
          }).focus().run();
        });
      });
    }
    function onFilePaste(currentEditor, files, htmlContent) {
      if (htmlContent) {
        return false;
      }
      files.forEach((file) => {
        uploadImage(file, "article").then((url) => {
          currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
            type: "image",
            attrs: {
              src: url
            }
          }).focus().run();
        });
      });
    }
    function setLink() {
      ElMessageBox.prompt("", "\u6DFB\u52A0\u94FE\u63A5", {
        confirmButtonText: "\u786E\u5B9A",
        cancelButtonText: "\u53D6\u6D88",
        inputPattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
        inputErrorMessage: "\u65E0\u6548\u94FE\u63A5"
      }).then(({ value }) => {
        if (value) {
          editor.chain().focus().extendMarkRange("link").setLink({ href: value }).run();
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["rich-editor", __props.readonly && "readonly"]
      }, _attrs))} data-v-26940f3e>`);
      _push(ssrRenderComponent(unref(EditorContent), { editor: unref(editor) }, null, _parent));
      if (unref(editor)) {
        _push(ssrRenderComponent(unref(BubbleMenu), {
          class: "bubble-menu",
          "tippy-options": { duration: 100 },
          editor: unref(editor)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="item disabled" data-v-26940f3e${_scopeId}>&gt;</div><div class="${ssrRenderClass([{ "is-active": unref(editor).isActive("bold") }, "item"])}" data-v-26940f3e${_scopeId}>\u52A0\u7C97</div><div class="${ssrRenderClass([{ "is-active": unref(editor).isActive("italic") }, "item"])}" data-v-26940f3e${_scopeId}>\u659C\u4F53</div><div class="${ssrRenderClass([{ "is-active": unref(editor).isActive("strike") }, "item"])}" data-v-26940f3e${_scopeId}>\u5212\u7EBF</div><div class="${ssrRenderClass([{ "is-active": unref(editor).isActive("paragraph") }, "item"])}" data-v-26940f3e${_scopeId}>\u6BB5\u843D</div><div class="${ssrRenderClass([{ "is-active": unref(editor).isActive("highlight") }, "item"])}" data-v-26940f3e${_scopeId}>\u9AD8\u5149</div><div class="${ssrRenderClass([{ "is-active": unref(editor).isActive("link") }, "item"])}" data-v-26940f3e${_scopeId}>\u94FE\u63A5</div><div class="item"${ssrIncludeBooleanAttr(!unref(editor).isActive("link")) ? " disabled" : ""} data-v-26940f3e${_scopeId}>\u53D6\u6D88\u94FE\u63A5</div><!--[-->`);
              ssrRenderList(6, (item) => {
                _push2(`<div class="${ssrRenderClass([{ "is-active": unref(editor).isActive("heading", { level: item }) }, "item"])}" data-v-26940f3e${_scopeId}>H${ssrInterpolate(item)}</div>`);
              });
              _push2(`<!--]--><div data-v-26940f3e${_scopeId}></div><div class="item disabled" data-v-26940f3e${_scopeId}>&gt;</div><!--[-->`);
              ssrRenderList(aligns, (item) => {
                _push2(`<div class="${ssrRenderClass([{ "is-active": unref(editor).isActive({ textAlign: item.value }) }, "item"])}" data-v-26940f3e${_scopeId}>${ssrInterpolate(item.label)}</div>`);
              });
              _push2(`<!--]--><div data-v-26940f3e${_scopeId}></div><div class="item disabled" data-v-26940f3e${_scopeId}>&gt;</div><div class="${ssrRenderClass([{ "is-active": unref(editor).isActive("codeBlock") }, "item"])}" data-v-26940f3e${_scopeId}>\u4EE3\u7801\u5757</div><div class="${ssrRenderClass([{ "is-active": unref(editor).isActive("bulletList") }, "item"])}" data-v-26940f3e${_scopeId}>\u65E0\u5E8F\u5217\u8868</div><div class="${ssrRenderClass([{ "is-active": unref(editor).isActive("orderedList") }, "item"])}" data-v-26940f3e${_scopeId}>\u6709\u5E8F\u5217\u8868</div><div class="item" data-v-26940f3e${_scopeId}>\u5206\u9694\u7EBF</div><div class="item" data-v-26940f3e${_scopeId}>\u7A7A\u884C</div><div data-v-26940f3e${_scopeId}></div><div class="item disabled" data-v-26940f3e${_scopeId}>&gt;</div><div class="item"${ssrIncludeBooleanAttr(!unref(editor).can().chain().focus().undo().run()) ? " disabled" : ""} data-v-26940f3e${_scopeId}>undo \u2B05\uFE0F</div><div class="item"${ssrIncludeBooleanAttr(!unref(editor).can().chain().focus().redo().run()) ? " disabled" : ""} data-v-26940f3e${_scopeId}>redo \u27A1\uFE0F</div>`);
            } else {
              return [
                createVNode("div", { class: "item disabled" }, ">"),
                createVNode("div", {
                  class: ["item", { "is-active": unref(editor).isActive("bold") }],
                  onClick: ($event) => unref(editor).chain().focus().toggleBold().run()
                }, "\u52A0\u7C97", 10, ["onClick"]),
                createVNode("div", {
                  class: ["item", { "is-active": unref(editor).isActive("italic") }],
                  onClick: ($event) => unref(editor).chain().focus().toggleItalic().run()
                }, "\u659C\u4F53", 10, ["onClick"]),
                createVNode("div", {
                  class: ["item", { "is-active": unref(editor).isActive("strike") }],
                  onClick: ($event) => unref(editor).chain().focus().toggleStrike().run()
                }, "\u5212\u7EBF", 10, ["onClick"]),
                createVNode("div", {
                  class: ["item", { "is-active": unref(editor).isActive("paragraph") }],
                  onClick: ($event) => unref(editor).chain().focus().setParagraph().run()
                }, "\u6BB5\u843D", 10, ["onClick"]),
                createVNode("div", {
                  class: ["item", { "is-active": unref(editor).isActive("highlight") }],
                  onClick: ($event) => unref(editor).chain().focus().toggleHighlight().run()
                }, "\u9AD8\u5149", 10, ["onClick"]),
                createVNode("div", {
                  class: ["item", { "is-active": unref(editor).isActive("link") }],
                  onClick: setLink
                }, "\u94FE\u63A5", 2),
                createVNode("div", {
                  class: "item",
                  onClick: ($event) => unref(editor).chain().focus().unsetLink().run(),
                  disabled: !unref(editor).isActive("link")
                }, "\u53D6\u6D88\u94FE\u63A5", 8, ["onClick", "disabled"]),
                (openBlock(), createBlock(Fragment, null, renderList(6, (item) => {
                  return createVNode("div", {
                    class: ["item", { "is-active": unref(editor).isActive("heading", { level: item }) }],
                    onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: item }).run()
                  }, "H" + toDisplayString(item), 11, ["onClick"]);
                }), 64)),
                createVNode("div"),
                createVNode("div", { class: "item disabled" }, ">"),
                (openBlock(), createBlock(Fragment, null, renderList(aligns, (item) => {
                  return createVNode("div", {
                    class: ["item", { "is-active": unref(editor).isActive({ textAlign: item.value }) }],
                    onClick: ($event) => unref(editor).chain().focus().setTextAlign(item.value).run()
                  }, toDisplayString(item.label), 11, ["onClick"]);
                }), 64)),
                createVNode("div"),
                createVNode("div", { class: "item disabled" }, ">"),
                createVNode("div", {
                  class: ["item", { "is-active": unref(editor).isActive("codeBlock") }],
                  onClick: ($event) => unref(editor).chain().focus().toggleCodeBlock().run()
                }, "\u4EE3\u7801\u5757", 10, ["onClick"]),
                createVNode("div", {
                  class: ["item", { "is-active": unref(editor).isActive("bulletList") }],
                  onClick: ($event) => unref(editor).chain().focus().toggleBulletList().run()
                }, "\u65E0\u5E8F\u5217\u8868", 10, ["onClick"]),
                createVNode("div", {
                  class: ["item", { "is-active": unref(editor).isActive("orderedList") }],
                  onClick: ($event) => unref(editor).chain().focus().toggleOrderedList().run()
                }, "\u6709\u5E8F\u5217\u8868", 10, ["onClick"]),
                createVNode("div", {
                  class: "item",
                  onClick: ($event) => unref(editor).chain().focus().setHorizontalRule().run()
                }, "\u5206\u9694\u7EBF", 8, ["onClick"]),
                createVNode("div", {
                  class: "item",
                  onClick: ($event) => unref(editor).chain().focus().setHardBreak().run()
                }, "\u7A7A\u884C", 8, ["onClick"]),
                createVNode("div"),
                createVNode("div", { class: "item disabled" }, ">"),
                createVNode("div", {
                  class: "item",
                  onClick: ($event) => unref(editor).chain().focus().undo().run(),
                  disabled: !unref(editor).can().chain().focus().undo().run()
                }, "undo \u2B05\uFE0F", 8, ["onClick", "disabled"]),
                createVNode("div", {
                  class: "item",
                  onClick: ($event) => unref(editor).chain().focus().redo().run(),
                  disabled: !unref(editor).can().chain().focus().redo().run()
                }, "redo \u27A1\uFE0F", 8, ["onClick", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RichEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-26940f3e"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=RichEditor-b6ff57a8.mjs.map
