<template>
  <div class="mood" v-if="nearWeekMood.data?.score">
    <div class="emoji" @click="popup = !popup"
      :style="`font-size:${size}px;width:${size + 10}px;height:${size + 10}px`">{{
    nearWeekMood.data?.emoji }}</div>
    <div class="mask" @click="popup = false" v-if="popup"></div>
    <div :class="['popup', popup && 'show']">
      <div class="content">
        <div class="title">近一周情绪分析</div>
        <div class="desc">
          关键字:{{ nearWeekMood.data.keywords?.toString() }}
        </div>
        <div class="score">
          <div class="left">
            <div class="label">整体评分</div>
            <div class="value">
              <div class="score-chart" ref="scoreChartEl"></div>
              <div class="num"> {{ nearWeekMood.data.score }} <span>分</span></div>
            </div>
            <div class="text">
              {{ nearWeekMood.data.desc }}
            </div>
          </div>
          <div class="right">
            <div class="label">整体趋势</div>
            <div class="trend-chart" ref="trendChartEl"></div>
            <div class="text">{{ nearWeekMood.data.trend }}</div>
          </div>
        </div>
        <div class="label" style="margin-bottom: 5px;">情绪占比</div>
        <div class="proportion">
          <div class="chart">
            <div class="part" :style="`width:${nearWeekMood.data.negative}%`"></div>
            <div class="part" :style="`width:${nearWeekMood.data.neutral}%`"></div>
            <div class="part" :style="`width:${nearWeekMood.data.positive}%`"></div>
          </div>
          <div class="legend">
            <div class="dot" style="opacity: 0.3;"></div>
            消极 <span>{{ nearWeekMood.data.negative }}%</span>
          </div>
          <div class="legend">
            <div class="dot" style="opacity: 0.6;"></div>
            中性 <span>{{ nearWeekMood.data.neutral }}%</span>
          </div>
          <div class="legend">
            <div class="dot" style="opacity: 1;"></div>
            积极 <span>{{ nearWeekMood.data.positive }}%</span>
          </div>
        </div>
        <div class="label" style="margin-bottom: 5px;">隐性情绪层</div>
        <div class="text">{{ nearWeekMood.data.implicit }}</div>
        <div class="by">
          by <span>{{ nearWeekMood.model }}</span>.{{ new Date(nearWeekMood.time).toLocaleString() }}(每天凌晨1点更新)
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts';
import { nextTick } from 'vue'

const scoreChartEl = ref()
const scoreChartIns = shallowRef({})
const trendChartEl = ref()
const trendChartIns = shallowRef({})
const { nearWeekMood, themeColor } = storeToRefs(useSysStore())
const props = defineProps({
  size: {
    type: Number,
    default: 40
  }
})

let popup = ref(false)
watch(nearWeekMood, v => {
  if (v?.data?.score) {
    nextTick(() => {
      scoreChartIns.value = echarts.init(scoreChartEl.value)
      trendChartIns.value = echarts.init(trendChartEl.value)
      renderScoreChart()
      renderTrendChart()
    })
  }
})

function renderScoreChart() {
  let progress = nearWeekMood.value.data.score / 100
  let option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        // center: ['50%', '75%'],
        // radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 3,
        axisLine: {
          show: false,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 0,
            color: [
              [progress, themeColor.value],
              [progress + 0.1, '#eee'],
            ]
          }
        },
        axisTick: {
          distance: -3,
          length: 4,
          inside: false,
          lineStyle: {
            color: "auto",
            width: 2
          }
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: progress,
          }
        ]
      }
    ]
  };
  scoreChartIns.value.setOption(option)
}

function renderTrendChart() {
  let option = {
    xAxis: {
      show: false,
      type: 'category',
    },
    yAxis: {
      type: 'value',
      show: false
    },
    grid: {
      show: false,
      height: "100%",
      width: "100%",
      top: 0,
      left: 0
    },
    legend: {
      show: false
    },
    title: {
      show: false,
    },
    series: [
      {
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: themeColor.value,
          width: 5,
        },
        data: nearWeekMood.value.data.trendData || []
      }
    ]

  };

  trendChartIns.value.setOption(option);
}


</script>
<style lang="scss" scoped>
.mood {
  position: absolute;
  z-index: 9;
  right: 10px;

  .emoji {
    position: relative;
    z-index: 3;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    background-color: #fff;
    padding-bottom: 2px;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    outline: none;

    &:active {
      opacity: 0.8;
    }
  }
}

.mask {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
}

.popup {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  font-size: 14px;
  background-color: #fff;
  width: 500px;
  padding: 15px;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: scale(0);
  transition: all .3s;
  transform-origin: 95% 10%;
  pointer-events: none;
  border-radius: 50%;
  color: #333;
  word-break: break-all;

  &.show {
    opacity: 1;
    transform: scale(1);
    border-radius: 5px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
  }

  .desc {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }

  .label {
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
  }

  .score {
    display: flex;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
    padding-top: 15px;
    margin-bottom: 15px;

    .left {
      flex: 1;
      overflow: hidden;
      margin-right: 5px;
      border-right: 1px solid #eee;

      .value {
        display: flex;
        align-items: center;
        height: 50px;

        .score-chart {
          width: 35px;
          height: 35px;
        }

        .num {
          font-size: 35px;
          font-weight: bold;
          margin-left: 5px;

          span {
            font-size: 14px;
          }
        }
      }
    }

    .right {
      flex: 1;
      overflow: hidden;
      margin-left: 5px;

      .trend-chart {
        width: 200px;
        height: 50px;
      }
    }
  }

  .proportion {
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;

    .chart {
      width: 100%;
      height: 15px;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 10px;

      .part {
        display: inline-block;
        height: 100%;
        background-color: var(--primary-color);
        opacity: 0.3;

        &:nth-child(2) {
          opacity: 0.6;
        }

        &:nth-child(3) {
          opacity: 1;
        }
      }
    }

    .legend {
      color: #888;
      font-size: 13px;
      display: flex;
      align-items: center;

      .dot {
        background-color: var(--primary-color);
        border-radius: 50%;
        width: 5px;
        height: 5px;
        margin-right: 5px;
      }

      span {
        color: #000;
        margin-left: 5px;
      }
    }
  }

  .by {
    font-size: 13px;
    text-align: right;
    border-top: 1px solid #eee;
    padding-top: 15px;
    margin-top: 15px;

    span {
      color: var(--primary-color);
    }
  }
}

@media screen and (max-width:750px) {
  .popup {
    right: -15px;
    top: -5px;
    width: calc(100vw - 40px);
    border-radius: 0 0 20px 20px !important;

    .score {
      .right {
        .trend-chart {
          width: 150px;
        }
      }
    }
  }
}
</style>