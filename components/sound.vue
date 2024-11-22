<template>
  <div class="com-sound">
    <el-icon class="icon" @click="play">
      <VideoPause v-if="isPlay" />
      <VideoPlay v-else />
    </el-icon>
    <audio class="audio" ref="player" :src="src" />
    <div class="canvas-box" ref="canvasBox">
      <canvas ref="canvas" style="height: 100%;width: 100%;" />
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useAVWaveform } from 'vue-audio-visual'
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'
import { number } from 'echarts';
const props = defineProps({
  src: String,
  duration: number
})
const { themeColor } = storeToRefs(useSysStore())
const canvasBox = ref(null)

const player = ref(null)
const canvas = ref(null)
const isPlay = ref(false)

const maxDuration = 30

onMounted(() => {
  console.log(canvasBox.value?.clientWidth)
  player.value?.addEventListener("play", () => { isPlay.value = true })
  player.value?.addEventListener("pause", () => { isPlay.value = false })
  useAVWaveform(player, canvas, {
    src: props.src,
    canvWidth: canvasBox.value?.clientWidth,
    playedLineColor: '#fff',
    noplayedLineColor: "#000",
    playtimeSliderColor: "#fff",
    playtimeFontColor: "#fff",
    playtimeWithMs: false,
    playtime: true
  })
})

function play() {
  if (player.value?.paused) {
    player.value?.play()
  } else {
    player.value?.pause()
  }
}
</script>
<style lang="scss" scoped>
.com-sound {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 100px;

  .icon {
    position: relative;
    font-size: 25px;
    margin-right: 5px;
    color: #fff;
  }

  .audio {
    display: none
  }

  .canvas-box {
    flex: 1;
    height: 100%;
  }
}
</style>