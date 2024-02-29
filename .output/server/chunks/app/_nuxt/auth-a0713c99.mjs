import { al as defineNuxtRouteMiddleware } from '../server.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'lodash-unified';
import 'moment';

const auth = /* @__PURE__ */ defineNuxtRouteMiddleware((to, from) => {
  var _a, _b;
  if (((_a = to.name) == null ? void 0 : _a.includes("admin")) && !((_b = to.name) == null ? void 0 : _b.includes("login")))
    ;
});

export { auth as default };
//# sourceMappingURL=auth-a0713c99.mjs.map
