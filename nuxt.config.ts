// https://nuxt.com/docs/api/configuration/nuxt-config
// import nodeResolve from "@rollup/plugin-node-resolve";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@element-plus/nuxt", '@pinia/nuxt',],
  routeRules: {
    "/admin/*": { ssr: false },
    "/visitor": { ssr: false },
    "/inappwebview/*": { ssr: false },
  },
  imports: {
    dirs: [
      'composables/*/*.{ts,js,mjs,mts}',
    ]
  },
  // experimental: {
  //   renderJsonPayloads: false
  // },
  app: {
    pageTransition: { name: 'page', mode: 'default' },
    head: {
      script: [
        {
          src: "https://api.map.baidu.com/api?v=3.0&ak=9sMw18GCO0oGECPgXreLCUm027j61Xe1",
        },
      ],
    },
  },
});
