// https://nuxt.com/docs/api/configuration/nuxt-config
// import nodeResolve from "@rollup/plugin-node-resolve";
import config from "./.config.json";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@element-plus/nuxt", "@pinia/nuxt"],
  routeRules: {
    "/admin/*": { ssr: false },
    "/visitor": { ssr: false },
    "/about": { ssr: false },
    "/inappwebview/*": { ssr: false },
  },
  // plugins: [
  //   {
  //     src: "~/plugins/vconsole",
  //     ssr: false,
  //     mode: "client",
  //   },
  // ],
  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false,
      },
    },
  },
  nitro: {
    rollupConfig: {
      external: ["ali-oss"],
    },
    // routeRules: {
    //   "/api/**": {
    //     cors: true,
    //     // headers: {
    //     //   "Access-Control-Allow-Origin": "*",
    //     //   "Access-Control-Allow-Methods": "*",
    //     //   "Access-Control-Allow-Headers": "*",
    //     //   "Access-Control-Allow-credentials": "true",
    //     // },
    //   },
    // },
  },
  imports: {
    dirs: ["composables/*/*.{ts,js,mjs,mts}"],
  },
  // experimental: {
  //   renderJsonPayloads: false
  // },
  sourcemap: {
    server: false,
    client: true,
  },
  app: {
    pageTransition: { name: "page", mode: "default" },
    head: {
      script: [
        {
          src: "https://unpkg.com/darkreader@4.9.84",
        },
        {
          src: "/amapInit.js",
        },
        {
          src: "//webapi.amap.com/maps?v=2.0&key=" + config.amap.key,
        },
        {
          src: "//webapi.amap.com/ui/1.1/main.js",
        },
        {
          src: "/ipify.js",
        },
        {
          type: "application/javascript",
          src: "https://api.ipify.org?format=jsonp&callback=getIP",
        },
      ],
    },
  },
});
