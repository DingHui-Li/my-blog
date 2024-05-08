// https://nuxt.com/docs/api/configuration/nuxt-config
// import nodeResolve from "@rollup/plugin-node-resolve";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@element-plus/nuxt", "@pinia/nuxt"],
  routeRules: {
    "/admin/*": { ssr: false },
    "/visitor": { ssr: false },
    "/about": { ssr: false },
    "/inappwebview/*": { ssr: false },
  },
  // typescript: {
  //   typeCheck: true,
  // },
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
          src: "//webapi.amap.com/maps?v=2.0&key=50a9416f87740841a14bac5ab28ee96a",
        },
        {
          src: "//webapi.amap.com/ui/1.1/main.js",
        },
      ],
    },
  },
});
