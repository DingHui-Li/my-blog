// https://nuxt.com/docs/api/configuration/nuxt-config
// import nodeResolve from "@rollup/plugin-node-resolve";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt"],
  routeRules: {
    "/admin/*": { ssr: false },
    "/inappwebview/*": { ssr: false },
  },
  nitro: {
    rollupConfig: {
      // plugins: [
      //   nodeResolve({
      //     extensions: [".mjs", ".js", ".json", ".node", ".ts"],
      //   }),
      // ],
    },
  },
  // build: {
  //   transpile: ["ali-oss"],
  // },
  app: {
    head: {
      script: [
        {
          src: "https://api.map.baidu.com/api?v=3.0&ak=9sMw18GCO0oGECPgXreLCUm027j61Xe1",
        },
      ],
    },
  },
});
