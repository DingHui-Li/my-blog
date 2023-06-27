<template lang="pug">
.total-mileage
  .echarts(ref='echartsEl' style='width:100vw;height:100vw')
</template>
<script setup>
const { $eChart } = useNuxtApp();

let echartsInstance;
let echartsEl = ref();

onMounted(() => {
  echartsInstance = $eChart.init(echartsEl.value);
  console.log(echartsInstance);
  initECharts();
});

function initECharts() {
  echartsInstance.setOption({
    series: [
      {
        type: "gauge",
        progress: {
          show: true,
          width: 18,
        },
        axisLine: {
          lineStyle: {
            width: 18,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 15,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        axisLabel: {
          distance: 25,
          color: "#999",
          fontSize: 20,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10,
          },
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 80,
          offsetCenter: [0, "70%"],
        },
        data: [
          {
            value: 70,
          },
        ],
      },
    ],
  });
}
</script>
<style lang="scss" scoped>
.total-mileage {
}
</style>
