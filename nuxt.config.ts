// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt"],
  routeRules: {
    "/admin/*": { ssr: false },
  },
  build: {
    transpile: ["ali-oss"],
  },
});
