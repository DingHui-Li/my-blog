<template lang="pug">
.photo-album
  .header 
    .title {{ data.title }}
    .num 共{{ data.imgs?.length }}张照片
    TopicTag(v-for="topic in data.topics" :data='topic')
    .date() 发布于 {{ moment(data.createTime).calendar() }}
    .date(v-if="data.createTime!=data.updateTime") {{moment(data.updateTime).fromNow()}}更新
  .content {{ data.textContent }}
  .imgs
    .item(v-for="(item,index) in data.imgs")
      .img
        Vimg(ref='imgsEl' :preview-teleported='true' :src='item' :thumb='item+"?x-oss-process=image/resize,m_fill,w_1000"')
        .info(v-if='exifList[index]')
          .text.left {{exifList[index].Make||""}} {{exifList[index].Model||"" }}
            .date {{ moment(exifList[index].CreateDate||"").format('YYYY/MM/DD HH:mm') }}
          .text.right 
            .shot {{ getShotInfo(exifList[index]) }}
</template>
<script setup>
import { onMounted, nextTick } from 'vue'
import moment from "moment";
import TopicTag from "~/pages/components/topicTag.vue";
import EXIF from 'exifr'
const props = defineProps({
  data: Object,
});
let exifList = ref([])
let imgsEl = ref([])

watch(() => props.data, (v) => {
  console.log(v)
  nextTick(() => {
    // console.log(imgsEl.value[0].originImgEl.file)
    props.data.imgs?.forEach((item, index) => {
      item = item.replace('http:', 'https:')
      EXIF.parse(item, ['CreateDate', 'Make', 'LensModel', 'Model', 'FocalLengthIn35mmFormat', 'FNumber', 'ExposureTime', 'ISO']).then(res => {
        exifList.value[index] = res
      })
    })
  })
})

function getShotInfo(info) {
  if (!info.FocalLengthIn35mmFormat) {
    return ''
  }
  return `${info.FocalLengthIn35mmFormat}mm  f/${info.FNumber}  ${info.ExposureTime?.toFixed(2)}s  ISO${info.ISO}`
}
</script>
<style lang='scss' scoped>
.photo-album {
  padding: 15px;
  background: #f5f5f5;
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
  }

  .content {
    font-size: 15px;
    color: #333;
    text-align: center;
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

        .info {
          position: relative;
          top: -5px;
          width: 100%;
          background-color: #fff;
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