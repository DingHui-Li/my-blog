import { ref } from 'vue';
import { $ as $http } from '../server.mjs';
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
import 'vue/server-renderer';
import 'moment';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function useList(url) {
  let pagation = ref(new Pagation());
  let list = ref([]);
  function getList(filter = {}) {
    pagation.value.loading = true;
    return $http.get(url, {
      ...filter,
      page: pagation.value.page,
      size: pagation.value.size
    }).then((res) => {
      var _a, _b;
      list.value = (_a = res.data) == null ? void 0 : _a.list;
      pagation.value.total = (_b = res.data) == null ? void 0 : _b.total;
    }).finally(() => {
      pagation.value.loading = false;
    });
  }
  return { pagation, list, getList };
}
class Pagation {
  constructor() {
    __publicField(this, "page", 1);
    __publicField(this, "size", 10);
    __publicField(this, "total", 0);
    __publicField(this, "loading", false);
  }
}

export { useList as default };
//# sourceMappingURL=useList-a301c7c1.mjs.map
