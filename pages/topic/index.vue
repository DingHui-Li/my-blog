<template>
  <div class="topic-page" v-loading="loading">
    <div class="chart" ref="chartEl"></div>
  </div>
</template>
<script setup lang='ts'>
import { shallowRef } from 'vue'
import $http from "@/utils/http.js";
import * as echarts from 'echarts';

const chartEl = ref()
const chartIns = shallowRef<any>({})
const loading = ref(true)


onMounted(() => {
  chartIns.value = echarts.init(chartEl.value)
  chartIns.value.on("click", (params: any) => {
    useRouter().push(`/topic/${params.data._id}#topic`)
  })
  $http.get('/api/topic/st').then(res => {
    updateChart(res.data)
  }).finally(() => {
    loading.value = false
  })
})

function updateChart(data: Array<any>) {
  data = data.map((item: any) => {
    item.size = item.count
    item.value = item.count
    return item
  })
  console.log(data)
  const treemapOption = {
    color: ['#212121', "#6663FD", '#38CB89', '#BAC2DB', '#3B4767', '#E27245', '#FE3E3E', '#009688', '#FFC107', '#E91E63', '#8BC34A', '#795548'],
    series: [
      {
        type: 'treemap',
        id: 'echarts-package-size',
        animationDurationUpdate: 1000,
        roam: false,
        nodeClick: undefined,
        data: data,
        universalTransition: true,
        width: '100%',
        height: '100%',
        label: {
          show: true,
          formatter: (t: any) => {
            return `${t.name}(${t.value})`
          }
        },
        labelLayout(params: any) {
          return {
            fontSize: Math.max(params.rect.width / 10, 12)
          };
        },
        // animationDelay: function (idx: number) {
        //   return idx * 100;
        // },
        itemStyle: {
          borderWidth: 1,
          borderRadius: 8,
          gapWidth: 2,
        },
        breadcrumb: {
          show: false
        },
      }
    ]
  };
  let currentOption: any = treemapOption;
  chartIns.value.setOption(currentOption);
}
</script>
<style lang="scss" scoped>
.topic-page {
  height: 100%;
  box-sizing: border-box;
  padding: 15px;
  box-sizing: border-box;
  overflow: auto;

  .chart {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}

@media screen and (max-width:750px) {
  .chart {
    margin: 0 !important;
    height: 100%;
  }
}
</style>