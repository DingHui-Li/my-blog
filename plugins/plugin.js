import * as echarts from "echarts";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      echarts,
    },
  };
});
