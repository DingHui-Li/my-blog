<template>
  <div class="choose-sound" @click="popup = true">
    <el-icon class="icon">
      <Microphone />
    </el-icon>
    <div class="text"> 添加声音</div>
    <el-icon class="arrow">
      <ArrowRight />
    </el-icon>
    <el-drawer v-model="popup" direction="btt" append-to-body size="90vh" :with-header="false">
      <div class="drawer">
        <div class="header">
          <h4>添加声音</h4>
          <el-icon :size="25" @click="popup = false">
            <Close />
          </el-icon>
        </div>
        <div class="content">
          <div class="input-sound" v-show="duration > 0">
            <Sound v-if="mediaUrl"
              :src="mediaUrl || 'https://staskobzar.github.io/vue-audio-visual/file_example_MP3_1MG.mp3'" />
            <AVMedia v-else :media="mediaStream" type="wform" style="width: 100%;" />
            <div v-if="!mediaUrl" class="progress" :style="`width:${(duration / maxDuration) * 100}%`"></div>
          </div>
          <div class="actions">
            <div v-if="!mediaUrl" :class="['record-btn', recording && 'active']" @mousedown="handleStart"
              @touchstart="handleStart" @mouseup="handleEnd" @touchend="handleEnd" @touchcancel="handleEnd">
              <div class="text">长按录制</div>
            </div>
            <div v-if="mediaUrl" class="btn" @click="handleCancel">取消</div>
            <div v-if="mediaUrl" class="btn" @click="handleConfirm">确定</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { AVMedia } from 'vue-audio-visual'
import { Microphone, ArrowRight, Close } from '@element-plus/icons-vue'
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  'modelValue': Array
})

const popup = ref(false)
const route = useRoute()
const maxDuration = 30;//录音最大时长30s
const duration = ref(0)
const recording = ref(false)
const mediaStream = ref()
const mediaUrl = ref('')
let timer = ''
let mediaRecorder;
let recordedBlobs;

// watch(popup, v => {
//   if (v) {
//     useRouter().push(route.fullPath + '#choosesound')
//   } else {
//     useRouter().back()
//   }
// })
// watch(() => route.hash, v => {
//   if (!v) {
//     popup.value = false
//   }
// })

function handleStart(e) {
  e.preventDefault()
  console.log('start')
  clearInterval(timer)
  duration.value = 0
  recording.value = true
  startRecording()
  timer = setInterval(() => {
    duration.value++
    if (duration.value >= maxDuration) {
      handleEnd()
    }
  }, 1000);
}
function handleEnd() {
  console.log('end')
  recording.value = false
  if (timer) {
    clearInterval(timer)
    timer = ''
    stopRecording()
  }
}

// 启动录音
function startRecording() {
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
  // 因为这样可能会覆盖已有的属性。这里我们只会在没有 getUserMedia 属性的时候添加它。
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      // 首先，如果有 getUserMedia 的话，就获得它
      var getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      // 一些浏览器根本没实现它 - 那么就返回一个 error 到 promise 的 reject 来保持一个统一的接口
      if (!getUserMedia) {
        return Promise.reject(
          new Error("getUserMedia is not implemented in this browser"),
        );
      }
      // 否则，为老的 navigator.getUserMedia 方法包裹一个 Promise
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaStream.value = stream
      mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      recordedBlobs = [];
      mediaRecorder.ondataavailable = event => {
        if (event.data && event.data.size > 0) {
          console.log(event.data)
          recordedBlobs.push(event.data);
        }
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedBlobs, { type: 'audio/mp3' });
        mediaUrl.value = URL.createObjectURL(blob);
      }
      mediaRecorder.start();
    })
    .catch(error => {
      alert(error)
      console.error('Error capturing audio:', error)
      handleEnd()
    });
}

// 停止录音
function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
    mediaStream.value?.getTracks().forEach((track) => track.stop());
    mediaStream.value = ''
    recordedBlobs = []
  }
}

function handleCancel() {
  mediaUrl.value = ''
  popup.value = false
  duration.value = 0
}
function handleConfirm() {
  props.modelValue?.push({
    src: mediaUrl.value,
    duration: duration.value,
  })
  emits("update:modelValue", props.modelValue)
  handleCancel()
}
</script>
<style lang="scss" scoped>
.choose-sound {
  padding: 15px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
  user-select: none;

  &:active {
    background-color: #eee;
  }


  .icon {
    font-size: 18px;
    margin-right: 15px;
  }

  .text {
    flex: 1;
    overflow: hidden;
    font-size: 15px;
    user-select: none;
  }
}

.drawer {
  height: 90vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
}

.header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  flex: 1;
  overflow: hidden;

  .input-sound {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px;
    height: 50px;
    width: 80%;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--primary-color);

    .progress {
      position: absolute;
      height: 100%;
      left: 0;
      transition: all 1s linear;
      background-color: var(--primary-color);
      opacity: 0.1;
    }
  }

  .actions {
    position: relative;
    margin-top: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40%;
    min-height: 200px;

    .btn {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:active {
        background-color: #33333320;
      }
    }
  }

  .record-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50% 50% 0 0;
    border-top: 1px solid var(--primary-color);
    border-bottom: none !important;
    user-select: none;
    transition: all .3s;

    &.active {
      background: linear-gradient(to bottom, var(--primary-color), transparent);
      opacity: 0.7;
    }

    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 22px;
      opacity: 0.5;
    }
  }
}

@media screen and (max-width:750px) {
  .drawer {
    height: 90vh;
  }

  .content {
    flex-direction: column;
  }
}
</style>