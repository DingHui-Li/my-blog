<template>
  <div class="photo-album">
    <div class="header">
      <div class="title">{{ data.title }}</div>
      <div class="num">共{{ data.imgs?.length }}张照片</div>
      <TopicTag v-for="topic in data.topics" :data="topic"></TopicTag>
      <div class="date">发布于 {{ moment(data.createTime).calendar() }}</div>
      <div class="info">
        <div class="location" v-if="data.location" @click="openMap">
          <el-icon class="icon">
            <LocationFilled></LocationFilled>
          </el-icon>
          <span v-if="data.location.city">
            {{ data.location.city }} ·
          </span>
          <span>{{ data.location.name || data.location }}</span>
        </div>
        <div class="weather" v-if="data.weather" @click="openWeather"> {{ data.weather.text }} {{ data.weather.temp
          }}°C
        </div>
      </div>
    </div>
    <div class="content">{{ data.textContent }}</div>
    <div class="imgs">
      <div class="item" v-for="(item, index) in data.imgs">
        <div class="img">
          <Vimg ref="imgsEl" :preview-teleported="true" :src="item"
            :thumb="item + '?x-oss-process=image/resize,m_mfit,w_1000'"></Vimg>
          <div class="info" v-if="exifList[index]">
            <div class="text left">{{ exifList[index].Make || "" }} {{ exifList[index].Model || "" }}
              <div class="date">{{ moment(exifList[index].CreateDate || "").format('YYYY/MM/DD HH:mm') }}</div>
            </div>
            <div class="text right">
              <div class="shot">{{ getShotInfo(exifList[index]) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, nextTick } from 'vue'
import moment from "moment";
import TopicTag from "~/pages/components/topicTag.vue";
import { LocationFilled } from '@element-plus/icons-vue'
import EXIF from 'exifr'
import $http from "@/utils/http.js";

const props = defineProps({
  data: Object,
});
let exifList = ref([])
let imgsEl = ref([])

watch(() => props.data, (v) => {
  console.log(v)
  nextTick(() => {
    // imgsEl.value[0].zoomImgEl

    props.data.imgs?.forEach((item, index) => {
      item = item.replace('http:', 'https:')
      $http.get(item + '?x-oss-process=image/info').then(res => {
        console.log(res)
        let time = res.DateTime?.value.split(' ')[0].replace(/\:/g, '/') + ' ' + res.DateTime?.value.split(' ')[1]
        exifList.value[index] = {
          CreateDate: time,
          Model: res.Model?.value,
          Make: res.Make?.value,
          FocalLengthIn35mmFormat: res.FocalLengthIn35mmFilm?.value,
          FNumber: eval(res.FNumber?.value)?.toFixed(1),
          ExposureTime: eval(res.ExposureTime?.value),
          ISO: res.ISOSpeedRatings?.value
        }
      })
      // $http.get('/api/admin/file/downloadBase64', { url: item }).then(res => {
      //   console.log(res)
      //   EXIF.parse("data:image/jpg;base64," + res.data, ['CreateDate', 'Make', 'Model', 'FocalLengthIn35mmFormat', 'FNumber', 'ExposureTime', 'ISO']).then(res => {
      //     exifList.value[index] = res
      //   })
      // })
    })
  })
})

function getShotInfo(info) {
  if (!info.FocalLengthIn35mmFormat) {
    return ''
  }
  return `${info.FocalLengthIn35mmFormat}mm  f/${info.FNumber}  ${(info.ExposureTime * 1000)?.toFixed(0)}ms  ISO${info.ISO}`
}

function openWeather() {
  if (props.data.weather?.fxLink) {
    window.open(props.data.weather?.fxLink, '_blank')
  }
}
function openMap() {
  let latlng = props.data.location?.location
  if (latlng) {
    window.open(`https://ditu.amap.com/regeo?lng=${latlng.lng}&lat=${latlng.lat}&name=${props.data.location.name}`, '_blank')
  }
}
</script>
<style lang='scss' scoped>
.photo-album {
  height: 100%;
  overflow: hidden;
  padding: 15px;
  // background: #f5f5f5;
  border-left: 1px solid #99999950;

  .header {
    margin-bottom: 15px;
    text-align: center;

    .title {
      font-size: 30px;
      font-weight: bold;
      color: #3f51b5;
      margin-bottom: 5px;
    }

    .num {
      font-size: 14px;
      color: #333;
    }

    .date {
      font-size: 12px;
      color: #999;
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5px;

      .location {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #666;
        cursor: pointer;

        .icon {
          margin-top: -1px;
          font-size: 16px;
        }
      }

      .weather {
        font-size: 13px;
        color: #666;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  .content {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    text-align: center;
    word-break: break-all;
    white-space: pre-wrap;
  }

  .imgs {
    .item {
      // border-top: 15px solid #f5f5f5;
      padding-bottom: 30px;
      padding-top: 30px;

      .img {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        // border-radius: 10px;
        overflow: hidden;
        background-color: #f9f9f9;
        // box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.05);
        font-size: 0;

        .info {
          position: relative;
          width: 100%;
          // background-color: #fff;
          display: flex;
          padding: 10px;
          box-sizing: border-box;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: #555;

          .left {
            font-size: 14px;
            font-weight: bold;
            color: #333;

            .date {
              font-size: 12px;
              color: #999;
              font-weight: normal;
              margin-top: 2px;
            }
          }

          .right {
            .shot {
              font-size: 12px;
              font-weight: bold;
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>