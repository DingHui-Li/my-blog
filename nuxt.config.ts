// https://nuxt.com/docs/api/configuration/nuxt-config
// import nodeResolve from "node-resolve";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt"],
  routeRules: {
    "/admin/*": { ssr: false },
  },
  nitro: {
    rollupConfig: {
      external: ["ali-oss"],
      // plugins: [
      //   nodeResolve({
      //     exportConditions: ["node"],
      //     extensions: [".mjs", ".node"],
      //   }),
      // ],
    },
  },
  build: {
    transpile: ["ali-oss"],
  },
});
