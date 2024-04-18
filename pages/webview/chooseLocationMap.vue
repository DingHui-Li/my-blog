<template>
    <div class="map-container" ref="mapContainer"></div>
</template>
<script setup>
const mapContainer = ref()
const poiList = ref([])
const currentCity = ref({})
let positionPicker = {}
let clickItem = false

watch(poiList, (v) => {
    window.flutter_inappwebview.callHandler('poiList', v);
})

onMounted(() => {
    window.searchAddress = searchAddress;
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
            let city = result.regeocode.addressComponent?.city
            if (currentCity.value?.name !== city) {
                searchAddress(city, 1).then(res => {
                    currentCity.value = res[0]
                })
            }
        })
        positionPicker.on('fail', (err) => {
            console.log(err)
        })
        if (props.modelValue.location?.lat) {
            let location = props.modelValue.location
            positionPicker.start(new AMap.LngLat(location.lng, location.lat))
        } else {
            positionPicker.start()
        }
    });
})

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
                    window.flutter_inappwebview.callHandler('searchAddressCallback', result.poiList?.pois || []);
                    resolve(result.poiList?.pois || [])
                } else {
                    reject(result)
                }
            })
        })
    })
}
</script>
<style lang='scss' scoped>
.map-container {
    height: 100vh;
    width: 100vw;
}
</style>