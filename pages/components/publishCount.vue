<template>
  <div class="publish-count-container">
    <div class="title">{{ selectYear }}年共有 {{ totalCountOfYear }} 条内容
      <el-select class="years" v-model="selectYear">
        <el-option v-for="year in yearList" :label="year" :value="year" :key="year"></el-option>
      </el-select>
    </div>
    <div class="publish-count">
      <div class="chart">
        <div style="display: flex;overflow: auto;padding-bottom: 10px;">
          <div class="week-indicate">
            <div class="item">周一</div>
            <div class="item">周四</div>
            <div class="item">周日</div>
          </div>
          <div class="week" v-for="(week, index) in weekListOfYear" @click="handleClick"
            :style="`justify-content: ${index == 0 ? 'flex-end' : 'flex-start'};`">
            <div class="day indicate" v-if="week[0]">
              <span v-if="index == 1 || (index > 0 && weekListOfYear[index - 1][0]?.month != week[0]?.month)">
                {{ week[0].month }}月
              </span>
              <!-- <span v-if="index % 7 == 1">{{ week[0].month }}月</span> -->
            </div>
            <div :class="['day', data[day.date] && 'active', new Date(day.date).getMonth() % 2 == 0 && 'stripe']"
              v-for="day in week" :data-tip="`${new Date(day.date).format('yyyy年M月d日')}有 ${data[day.date]} 条内容`">
              <div class="box" :style="`opacity:${1 - (3 - data[day.date]) / 10 * 3}`" :data-date="day.date"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="years">
        <div :class="['year', selectYear == year && 'active']" @click="selectYear = year" v-for="year in yearList">
          {{ year }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import $http from "@/utils/http.js";

const emits = defineEmits(['choosedDate'])
const props = defineProps({
  type: String
})

let selectYear = ref()
selectYear.value = new Date().getFullYear()
let data = ref<{ [key: string]: number }>({})
let totalCountOfYear = ref<Number>(0)

let yearList = computed(() => {
  let t = []
  let date = new Date()
  for (let i = 0; i <= date.getFullYear() - 2023; i++) {
    t.push(2023 + i)
  }
  return t.reverse()
})

let weekListOfYear = computed(() => {
  let t: Array<Array<{ date: string, week: number, month: number }>> = []
  let firstDay = new Date(`${selectYear.value}/1/1`)
  let totalDayNum = 0
  for (let i = 1; i <= 12; i++) {
    totalDayNum += getDateLengthOfMonth(selectYear.value, i)
  }
  let week = []
  for (let i = 0; i < totalDayNum; i++) {
    let date = new Date(firstDay.getTime() + i * 86400000)
    week.push({
      date: date.format('yyyy-MM-dd'),
      month: date.getMonth() + 1,
      week: date.getDay()
    })
    if (date.getDay() == 0) {
      t.push(week)
      week = []
    }
  }
  t.push(week)
  // console.log(t)
  return t
})

watch(selectYear, () => {
  getData()
}, { immediate: true })
watch(() => props.type, () => {
  getData()
})

function getDateLengthOfMonth(year: number, month: number) {
  let date = new Date(year, month, 0)
  return date.getDate()
}

function getData() {
  $http.get('/api/article/st/date', {
    year: selectYear.value,
    type: props.type
  }).then(res => {
    let t: { [key: string]: number } = {};
    let totalCount = 0
    res?.data.forEach((element: { date: string, count: number }) => {
      t[element.date] = element.count
      totalCount += element.count
    });
    data.value = t
    totalCountOfYear.value = totalCount
  })
}

function handleClick(e: any) {
  let date = e.target.dataset.date
  if (date && data.value[date]) {
    emits('choosedDate', date)
  }
}
</script>
<style lang="scss" scoped>
.publish-count-container {
  position: relative;
  z-index: 1;
  background-color: #fff;
  margin: 15px;
  margin-bottom: 0;
  border-radius: 10px;
}

.title {
  font-size: 12px;
  padding: 15px;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .years {
    display: none;
    width: 100px;
  }
}

.publish-count {
  display: flex;
  padding: 15px;
  padding-top: 5px;
  box-sizing: border-box;


  .week-indicate {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 10px;
    margin-right: 5px;
    padding-top: 15px;
    white-space: nowrap;
  }

  .chart {
    flex: 1;
    overflow: hidden;
    display: flex;
    border: 1px solid #e0e0e0;
    padding: 15px;
    padding-bottom: 5px;
    border-radius: 5px;
    margin-right: 10px;
    justify-content: center;
    box-sizing: border-box;

    .week {
      display: flex;
      flex-direction: column;

      .day {
        position: relative;
        width: 10px;
        height: 10px;
        padding: 1px;

        &.stripe {
          .box {
            border-radius: 50%;
          }
        }

        .box {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          background-color: #e0e0e090;
          border-radius: 2px;
        }

        &.indicate {
          background-color: transparent;
          font-size: 10px;
          margin-bottom: 5px;
          text-align: center;
          white-space: nowrap;
        }

        &.active {
          .box {
            background-color: var(--primary-color);
          }

          &::before {
            content: attr(data-tip);
            position: fixed;
            z-index: 2;
            transform: translate(-50%, -110%);
            background-color: #fff;
            font-size: 12px;
            white-space: nowrap;
            padding: 5px 10px;
            border-radius: 5px;
            box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.08);
            pointer-events: none;
            opacity: 0;
            transition: all .5s;
            color: var(--primary-color);
            font-weight: bold;
          }

          &:hover {
            .box {
              filter: brightness(60%);
            }

            &::before {
              display: block;
              opacity: 1;
            }
          }
        }
      }
    }
  }

  .years {
    .year {
      user-select: none;
      cursor: pointer;
      width: 100px;
      box-sizing: border-box;
      padding: 8px 15px;
      border-radius: 5px;

      font-size: 12px;
      color: #333;

      &.active {
        background-color: var(--primary-color);
        color: #fff;
      }
    }
  }
}

@media screen and (max-width:1080px) {
  .publish-count-container {
    margin: 10px;
    margin-bottom: 0;
  }

  .title {
    margin-top: 15px;

    .years {
      display: block;
    }
  }

  .publish-count {

    .chart {
      margin-right: 0;
    }

    .years {
      display: none;
    }
  }
}
</style>