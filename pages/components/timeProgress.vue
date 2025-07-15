<template>
  <div class="time-progress">
    <div class="text">
      「年程余 {{ ((1 - today / days) * 100).toFixed(0) }}% · 今日余 {{ ((1 - daySecond / 86400) * 100).toFixed(4) }}%」
    </div>
    <div class="year">
      <div class="progress" :style="`width:${today / days * 100}%`"></div>
      <div class="icon-box">
        <span style="color:#4CAF50" :class="`icon iconfont icon-chuntian`"></span>
      </div>
      <div class="icon-box">
        <span style="color:#FF5722" :class="`icon iconfont icon-summer`"></span>
      </div>
      <div class="icon-box">
        <span style="color:#FF9800" :class="`icon iconfont icon-fengye`"></span>
      </div>
      <div class="icon-box">
        <span style="color:#00BCD4" :class="`icon iconfont icon-winter`"></span>
      </div>
    </div>
    <div class="day">
      <div :class="['hour', i % 6 == 0 ? 'num' : '']" v-for="i in 24"></div>
      <div class="progress" :style="`width:${daySecond / 86400 * 100}%`"></div>
      <div class="pulse-box" :style="`width:${100 - (daySecond / 86400 * 100)}%`">
        <div class="pulse"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const days = ref(0)//今年过了多少天
const today = ref()//今年一共多少天
const daySecond = ref(0)//今天过了多少秒

for (let i = 1; i <= 12; i++) {
  days.value += getDateLengthOfMonth(new Date().getFullYear(), i)
  if (i == new Date().getMonth()) {
    today.value = days.value + new Date().getDate()
  }
}

const todayStart = new Date(`${new Date().format('yyyy/MM/dd')} 00:00:00:00`)
let timer: any;
onMounted(() => {
  timer = setInterval(() => {
    daySecond.value = (new Date().getTime() - todayStart.getTime()) / 1000
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
})

function getDateLengthOfMonth(year: number, month: number) {
  let date = new Date(year, month, 0)
  return date.getDate()
}
</script>
<style lang="scss" scoped>
.time-progress {
  padding: 10px;
  padding-bottom: 0;
  box-sizing: border-box;
  overflow: hidden;

  .year {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    background-color: #eeeeee10;

    .progress {
      position: absolute;
      left: 0;
      height: 100%;
      background-color: var(--primary-color);
      opacity: 0.5;
    }

    .icon-box {
      position: relative;
      z-index: 2;
      width: 25%;
      text-align: center;

      .icon {
        font-size: 20px;
        color: green;
      }
    }
  }

  .day {
    position: relative;
    width: 100%;
    height: 5px;
    background-color: #eeeeee10;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .hour {
      position: relative;
      z-index: 2;
      width: 1px;
      height: 100%;
      background-color: #ffffff50;
      font-size: 0;

      &.num {
        width: 3px;
      }
    }

    .progress {
      position: absolute;
      left: 0;
      height: 100%;
      background-color: var(--primary-color);
    }

    .pulse-box {
      position: absolute;
      right: 0;
      height: 100%;
      min-width: 50%;
    }

    .pulse {
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background-color: var(--primary-color);
      animation: pulse infinite 2s;
      border-radius: 0 10px 10px 0;

      &::before {
        content: '';
        position: absolute;
        left: -40px;
        width: 40px;
        height: 100%;
        background: linear-gradient(to right, transparent, var(--primary-color));
      }
    }
  }

  .text {
    text-align: center;
    color: #fff;
    font-size: 12px;
    margin-bottom: 5px;
    opacity: 0.5;
  }
}

@keyframes pulse {
  0% {
    left: 0;
    opacity: 1;
  }

  70% {
    opacity: 1;
  }

  100% {
    left: 100%;
    opacity: 0;
  }
}
</style>