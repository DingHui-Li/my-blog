<template>
  <div class="map-page">
    <div class="map-container" ref="mapContainer"></div>
  </div>
</template>
<script setup>

const mapContainer = ref()
let mapInstance

onMounted(() => {
  mapInstance = new AMap.Map(mapContainer.value, {
    viewMode: "2D",
    mapStyle: "amap://styles/macaron",
    zoom: 11,
    center: [116.397428, 39.90923],
    features: ["bg", 'point', 'building']
  });
  getData()
})

function getData() {
  const position = new AMap.LngLat(116.397428, 39.90923);
  const marker = new AMap.Marker({
    position: position,
    content: markerNumberDiv(2),
    offset: new AMap.Pixel(-13, -30),
  });
  mapInstance.add(marker);
}
function markerNumberDiv(num = 1) {
  return `<div style="background:#fff;display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;box-shadow:0 0 8px 4px rgba(0,0,0,0.1)">${num}</div>`
}
</script>
<style lang="scss" scoped>
.map-page {
  height: 100%;
  overflow: auto;
  padding: 15px;
  box-sizing: border-box;

  .map-container {
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }
}
</style>