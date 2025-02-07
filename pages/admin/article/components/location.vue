<template>
  <div class="choose-location" @click="handleChooseLocation">
    <el-icon class="icon">
      <Location />
    </el-icon>
    <div class="text">{{ modelValue?.name || "选择位置" }}</div>
    <el-icon class="arrow">
      <ArrowRight />
    </el-icon>
    <el-drawer v-model="popup" direction="btt" append-to-body size="90vh" :with-header="false">
      <div class="drawer">
        <div class="header">
          <h4>选择位置</h4>
          <el-icon :size="25" @click="popup = false">
            <Close />
          </el-icon>
        </div>
        <div class="content">
          <div class="map-container" ref="mapContainer"></div>
          <div class="search-box">
            <el-input v-model="input" placeholder="搜索位置"></el-input>
            <el-icon class="icon" @click="handleSearch">
              <Search />
            </el-icon>
          </div>
          <div class="list" v-loading="loading">
            <div :class="['item', selectedLocation.id == currentCity.id && 'active']" @click="handleChoose(currentCity)"
              style="display: flex;align-items: center;">
              {{ currentCity.name }}
            </div>
            <div :class="['item', selectedLocation.id == item.id && 'active']" v-for="item in poiList" :key="item.id"
              @click="handleChoose(item)">
              <div class="name">{{ item.name }}</div>
              <div class="address" v-if="item.address">
                <span v-if="item.distance">{{ item.distance }}m |</span>
                {{ item.address }}
              </div>
            </div>
            <div :class="['btn', !selectedLocation.id && 'disabled']" @click="confirm">确定</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
  <div v-if="recentLocationList.length">
    <div class="recent-title">最近使用的地址:</div>
    <div class="recent-list">
      <div :class="['item', modelValue?.id == item.id && 'active']" v-for="item in recentLocationList" :key="item.id"
        @click="handleChooseRecent(item)">{{ item.city }}·{{ item.name }}</div>
    </div>
  </div>
</template>
<script setup>
import { Location, ArrowRight, Close, Search } from '@element-plus/icons-vue'
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  'modelValue': Object
})

const mapContainer = ref()
const popup = ref(false)
const poiList = ref([])
const currentCity = ref({})
const route = useRoute()
const input = ref('')
const loading = ref(false)
let mapInstance = {}
let positionPicker = {}
const selectedLocation = ref({})
let clickItem = false
const recentLocationList = ref([])//最近使用的地址列表
try {
  if (process.client) {
    recentLocationList.value = JSON.parse(window.localStorage['recent-location-list']) || []
  }
} catch { }

watch(() => recentLocationList.value, v => {
  console.log(v)
  if (process.client) {
    window.localStorage['recent-location-list'] = JSON.stringify(v)
  }
})
watch(popup, v => {
  if (v) {
    useRouter().push(route.fullPath + '#chooselocation')
  } else {
    useRouter().back()
  }
})
watch(() => route.hash, v => {
  if (!v) {
    popup.value = false
  }
})

function handleChooseLocation() {
  popup.value = true
  window?.AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
    mapInstance = new AMap.Map(mapContainer.value, {
      zoom: 16
    })
    positionPicker = new PositionPicker({
      mode: 'dragMap',
      map: mapInstance
    });
    positionPicker.on('success', (result) => {
      if (clickItem) {
        setTimeout(() => {
          clickItem = false
        }, 1000);
        return
      }
      console.log(result)
      result.regeocode.roads = result.regeocode.roads?.map(item => {
        item.type = 'road'
        return item
      }) || []
      poiList.value = [...result.regeocode.roads, ...result?.regeocode?.pois]
      //搜索城市位置
      let city = result.regeocode.addressComponent?.city || result.regeocode.addressComponent?.province
      findCurrentCity(city.replace('市', ''))
    })
    positionPicker.on('fail', (err) => {
      console.log(err)
    })
    if (props.modelValue?.location?.lat) {
      let location = props.modelValue.location
      positionPicker.start(new AMap.LngLat(location.lng, location.lat))

    } else {
      positionPicker.start()
    }
  });
}

//根据当前城市名查找当前城市经纬度信息
function findCurrentCity(cityName) {
  if (currentCity.value?.name !== cityName) {
    searchAddress(cityName, 1).then(res => {
      currentCity.value = res[0]
    })
  }
}
function handleSearch() {
  if (!input.value) {
    return
  }
  loading.value = true
  searchAddress(input.value, 20).then(res => {
    poiList.value = res
    positionPicker.start(res[0]?.location)
  }).finally(() => {
    loading.value = false
  })
}
//根据关键字查找经纬度信息
function searchAddress(keyword, size = 30) {
  return new Promise((resolve, reject) => {
    console.log('searchAddress')
    AMap.plugin('AMap.PlaceSearch', function () {
      var autoOptions = {
        pageSize: size,
      }
      var placeSearch = new AMap.PlaceSearch(autoOptions);
      console.log('keyword=', keyword)
      placeSearch.search(keyword, (status, result) => {
        console.log(result)
        if (status == 'complete') {
          resolve(result.poiList?.pois || [])
        } else {
          reject(result)
        }
      })
    })
  })
}

function handleChoose(data) {
  selectedLocation.value = data
  clickItem = true
  positionPicker.start(new AMap.LngLat(data.location.lng, data.location.lat))
}

function handleChooseRecent(location) {
  emits('update:modelValue', location)
}
function confirm() {
  if (selectedLocation.value?.id) {
    popup.value = false
    let latlng = selectedLocation.value.location
    let locationObj = {
      ...selectedLocation.value,
      city: selectedLocation.value.name == currentCity.value.name ? '' : currentCity.value.name,
      location: { lat: latlng.lat, lng: latlng.lng }
    }
    emits('update:modelValue', locationObj)
    addRecentLocation(locationObj)
  }
}

//添加最近使用的地址
function addRecentLocation(location) {
  let index = recentLocationList.value.findIndex(item => item.id == location.id)
  if (index >= 0) {
    recentLocationList.value.splice(index, 1)
  }
  recentLocationList.value = [location, ...recentLocationList.value]
  recentLocationList.value = recentLocationList.value.slice(0, 5)
}
</script>
<style lang="scss" scoped>
.choose-location {
  padding: 15px 0;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-top: 15px;

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
  position: relative;
  flex: 1;
  overflow: hidden;

  .map-container {
    flex: 1;
    height: 100%;
  }

  .list {
    position: absolute;
    right: 0;
    z-index: 2;
    background-color: #fff;
    width: 400px;
    height: calc(100% - 20px);
    overflow: auto;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 10px;
    padding-bottom: 15px;
    box-sizing: border-box;

    .item {
      padding: 15px 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      .name {
        font-size: 15px;
      }

      .address {
        font-size: 12px;
        color: #666;
      }

      &.active {
        background-color: var(--primary-color);
        color: #fff;

        .address {
          color: #fff;
          opacity: 0.5;
        }
      }
    }
  }

  .search-box {
    position: absolute;
    z-index: 2;
    top: 15px;
    left: 30px;
    width: 400px;
    border-radius: 30px;
    overflow: hidden;
    padding: 5px 10px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;

    &:deep(.el-input) {
      flex: 1;

      .el-input__wrapper {
        box-shadow: none;
      }
    }

    .icon {
      font-size: 20px;
      font-weight: bold;
      color: var(--primary-color);
      margin-right: 5px;
    }
  }

  .btn {
    position: sticky;
    bottom: 0;
    margin: 0 15px;
    margin-top: 15px;
    padding: 14px;
    width: calc(100% - 30px);
    box-sizing: border-box;
    text-align: center;
    border-radius: 30px;
    font-size: 14px;
    background-color: var(--primary-color);
    color: #fff;
    box-shadow: 0 0 12px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    user-select: none;

    &:active {
      opacity: 0.8;
    }

    &.disabled {
      background-color: #999;
      cursor: not-allowed;

      &:active {
        opacity: 1;
      }
    }
  }
}

.recent-title {
  font-size: 12px;
  padding: 10px 0;
}

.recent-list {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;

  .item {
    border: 1px solid #eee;
    border-radius: 30px;
    display: inline-block;
    padding: 5px 10px;
    font-size: 14px;
    margin-right: 5px;
    cursor: pointer;
    margin-bottom: 5px;

    &.active {
      background-color: var(--primary-color);
      color: #fff;
    }
  }
}

@media screen and (max-width:750px) {
  .drawer {
    height: 90vh;
  }

  .content {
    flex-direction: column;

    .list {
      height: 50%;
      width: 100%;
    }
  }

  .search-box {
    width: calc(100% - 60px) !important;
    left: 50% !important;
    transform: translateX(-50%);
  }

  .list {
    position: relative !important;
    bottom: 0 !important;
    width: 100% !important;
    margin: 0 !important;
    height: 50vh !important;
  }
}
</style>