<template>
    <div ref="vimg" class="v-img vue-img-com-vvcx" @click="handleClick" :style="style">
        <img ref='img' class="img" :src="thumb || src" :alt="alt" :style="`${imgStyle}`">
        <div class="title" v-if="title">{{ title }}</div>
        <div @click="imgClick" ref="el" class="v-img-zoom">
            <!-- <div class="indicator">
                {{ currentIndex + 1 }}/{{ imgList.length }}
            </div> -->
            <img ref="zoomImg" class="zoom-img" @wheel="onMouseWheel" :src="src" :draggable="false"
                @mousedown="touchStart" @touchstart="touchStart" @mousemove="touchMove" @touchmove="touchMove"
                @touchend="touchEnd" @mouseup="touchEnd" @mouseover="touchcancel" @touchcancel="touchcancel" />
            <div ref="mask" class="v-img-mask"></div>
            <!-- <div ref="imglist" class="img-list" @mousedown="imgListTouchStart" @touchstart="imgListTouchStart"
                @mousemove="imgListTouchMove" @touchmove="imgListTouchMove" @touchend="imgListTouchEnd"
                @mouseup="imgListTouchEnd" @mouseover="imgListTouchcancel" @touchcancel="imgListTouchcancel"
                :style="`transform:translateX(${imgListTranslateX}px)`">
                <div ref="imgbox" class="img-box" v-for="item in imgList">
                    <img ref="zoomImg" @click="close" class="zoom-img" @wheel="onMouseWheel" :src="item" :draggable="false"
                        @mousedown="touchStart" @touchstart="touchStart" @mousemove="touchMove" @touchmove="touchMove"
                        @touchend="touchEnd" @mouseup="touchEnd" @mouseover="touchcancel" @touchcancel="touchcancel" />
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    props: {
        src: String,
        thumb: String,
        alt: String,
        w: Number | String,
        h: Number | String,
        aspectRatio: Number | String,
        fit: {
            type: String,
            default: "cover"
        },
        title: String,
        transitionDuration: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            containerWidth: 0,
            timer: null,
            clicks: 0,
            open: false,
            zoom: false,
            originImgRect: {
                top: 0,
                left: 0,
                width: 0,
                height: 0
            },
            animeing: false,
            touch: {
                active: false,
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            },
            imgListTouch: {
                active: false,
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            },
            scale: 1,

            imgNodeList: [],
            imgList: [],
            imgIndex: 0,
            currentIndex: 0,
            imgListTranslateX: 0
        }
    },
    mounted() {
        this.containerWidth = this.$refs.el.clientWidth
        const parent = this.$refs.vimg.parentNode
        for (let index = 0; index < parent.children.length; index++) {
            const item = parent.children[index]
            if (item.classList.contains('vue-img-com-vvcx')) {
                this.imgNodeList.push(item)
                const src = item.children[0].src
                this.imgList.push(src)
                if (src == this.$refs.img.src) {
                    this.imgIndex = index
                    this.currentIndex = index
                }
            }
        }
    },
    computed: {
        style() {
            return `width:${this.w}`
        },
        imgStyle() {
            let w = isNaN(this.w) ? this.w : (this.w + 'px')
            let h = isNaN(this.h) ? this.h : (this.h + 'px')
            let t = `object-fit:${this.fit};width:${w || '100%'};height:${h || 'auto'};aspect-ratio:${this.aspectRatio}`
            return t
        },
        originImgEl() {
            return this.imgNodeList[this.currentIndex]
                .children[0]
        },
        zoomImgCenterRect() {
            // console.log(document.body.clientHeight)
            let height = this.$refs.el.clientHeight
            let width = this.$refs.el.clientWidth
            let imgHeight = this.zoomImgEl.naturalHeight
            let imgWidth = this.zoomImgEl.naturalWidth
            if (height > width) {
                imgWidth = width > 750 ? 750 : width
                imgHeight = imgHeight / this.zoomImgEl.naturalWidth * imgWidth
            } else {
                const maxHeight = height - 20
                imgHeight = imgHeight > maxHeight ? maxHeight : imgHeight
                imgWidth = imgWidth / this.zoomImgEl.naturalHeight * imgHeight
                console.log(imgWidth, imgHeight)
            }
            let top = height / 2 - imgHeight / 2
            top = top < 0 ? 0 : top
            return {
                top: top,
                left: width / 2 - imgWidth / 2,
                width: imgWidth,
                height: imgHeight
            }
        },
        zoomImgEl() {
            return this.$refs.zoomImg[this.currentIndex] || this.$refs.zoomImg
        },
        maxTranslateWidth() {
            return this.containerWidth * (this.imgList.length - 1) || 0
        },
        imgListMoveDistance() {
            return (this.imgListTouch.start.x - this.imgListTouch.end.x) || 0
        },
    },
    watch: {
        open(v) {
            this.$nextTick(() => {
                if (v) {
                    this.currentIndex = this.imgIndex
                    document.body.style.overflow = 'hidden'
                    requestAnimationFrame(this.showZoomImg)
                } else {
                    setTimeout(() => {
                        document.body.style.overflow = 'auto'
                    }, 100);
                    requestAnimationFrame(this.hideZoomImg)
                }
            })
        },
        currentIndex: {
            handler(v, oldV) {
                if (this.open) {
                    this.getOriginImgInfo()
                    this.setZoomImgRect(this.zoomImgCenterRect)
                }
                if (this.imgNodeList.length) {
                    this.imgNodeList[oldV].children[0].style.opacity = 1
                }
                if (this.$refs.imglist) {
                    this.$refs.imglist.style.transition = 'all .5s'
                }
                this.imgListTranslateX = -(this.containerWidth * this.currentIndex)
            },
            immediate: true
        }
    },
    methods: {
        //获取源图宽高和位置
        getOriginImgInfo() {
            let rect = this.originImgEl.getBoundingClientRect()
            this.originImgRect = rect
        },
        //设置缩放图片的width,height,top,left
        setZoomImgRect(rect, duration = 0) {
            this.zoomImgEl.style.cssText = `
            transition:all ${duration}ms;
            top:${rect.top}px;left:${rect.left}px;
            width:${rect.width}px;height:${rect.height}px;
            transform:translate(0,0);
            `
        },
        //过渡动画完成后返回
        anime(fun, duration = 0) {
            return new Promise(resolve => {
                fun()
                setTimeout(() => {
                    resolve()
                }, duration);
            })
        },
        //显示缩放图片
        showZoomImg() {
            this.animeing = true
            document.body.appendChild(this.$refs.el)
            this.anime(() => {
                this.getOriginImgInfo()
                this.setZoomImgRect(this.originImgRect)
            }).then(() => {
                return this.anime(() => {
                    this.setZoomImgRect(this.zoomImgCenterRect, this.transitionDuration)
                    this.$refs.el.classList.add('open')
                    this.originImgEl.style.opacity = 0
                    this.$refs.mask.style.opacity = 1
                }, this.transitionDuration)
            }).then(() => {
                this.animeing = false
            })
        },
        //隐藏缩放图片
        hideZoomImg() {
            this.animeing = true
            this.$refs.mask.style.opacity = 0
            this.getOriginImgInfo()
            this.anime(() => this.setZoomImgRect(this.originImgRect, this.transitionDuration), this.transitionDuration).then(() => {
                return this.anime(() => {
                    this.$refs.el.classList.remove('open')
                    this.originImgEl.style.opacity = 1
                }, 100)
            }).then(() => {
                setTimeout(() => {
                    this.teleport = false
                }, 1000);
                try {
                    document.body.removeChild(this.$refs.el)
                } catch (err) {
                    console.log(err)
                }
                this.animeing = false
            })
        },
        imgClick(e) {
            this.clicks++;
            if (this.clicks === 1) {
                this.timer = setTimeout(() => {
                    this.clicks = 0;
                    this.close(e)
                }, 200);
            } else if (this.clicks === 2) {
                clearTimeout(this.timer);
                this.clicks = 0;
                this.dblclick(e)
            }
        },
        handleClick() {
            if (this.animeing) {
                return
            }
            if (this.open) {
                if (!this.zoom) {
                    this.open = false
                }
            } else {
                this.open = true
            }
        },
        close() {
            const startPos = this.touch.start
            const endPos = this.touch.end
            if (this.imgListMoveDistance != 0) {
                return
            }
            if (this.scale != 1 || (startPos.x != endPos.x && startPos.y != endPos.y)) {
                return
            }
            this.open = false
        },
        dblclick(e) {
            this.scale = this.scale == 1 ? 2 : 1
            if (this.scale == 1) {
                this.getOriginImgInfo()
                //恢复至原大小位置
                this.setZoomImgRect(this.zoomImgCenterRect)
            } else {
                //点击位置放大2倍
                this.zoomImgEl.style.transition = 'all .3s'
                this.zoomImgEl.style.transform = `scale(${this.scale})`
                this.zoomImgEl.style.transformOrigin = `${e.layerX}px ${e.layerY}px`
            }
        },
        touchStart(e) {
            let pos = this.getPointPos(e)
            this.touch = {
                active: true,
                start: pos,
                end: pos,
            }
        },
        touchMove(e) {
            if (!this.touch.active) {
                return
            }
            let pos = this.getPointPos(e)
            const difX = (this.touch.end.x - pos.x) / 1.2
            const difY = (this.touch.end.y - pos.y) / 1.2
            this.touch.end = pos
            let top = Number(this.zoomImgEl.style.top.replace('px', ''))
            let left = Number(this.zoomImgEl.style.left.replace('px', ''))
            let newTop = top - difY
            let newLeft = left - difX
            this.zoomImgEl.style.transition = 'none'

            if (this.scale != 1) {
                this.zoomImgEl.style.top = newTop + 'px'
                this.zoomImgEl.style.left = newLeft + 'px'
            } else {
                if (this.imgListMoveDistance < 5) {
                    this.zoomImgEl.style.top = newTop + 'px'
                    let scale = Math.abs(this.touch.start.y - this.touch.end.y) / 1000
                    scale = scale > 0.5 ? 0.5 : scale
                    this.zoomImgEl.style.transform = `scale(${1 - scale})`
                    this.$refs.mask.style.opacity = 1 - scale
                }

            }
        },
        touchEnd(e) {
            this.touch.active = false
            if (this.scale == 1) {
                const difY = (this.touch.start.y - this.touch.end.y)
                if (Math.abs(difY) > 50) {
                    this.open = false
                } else {
                    if (this.imgListMoveDistance == 0) {
                        this.getOriginImgInfo()
                        this.setZoomImgRect(this.zoomImgCenterRect)
                    }
                }
            }
        },
        touchcancel(e) {
            this.touch.active = false
        },
        onMouseWheel(e) {
            // console.log(e)
        },
        getPointPos(e) {
            let x = e.clientX
            let y = e.clientY
            if (e.type.includes('touch')) {
                x = e.touches[0]?.clientX || 0
                y = e.touches[0]?.clientY || 0
            }
            return { x, y }
        },
        imgListTouchStart(e) {
            let pos = this.getPointPos(e)
            this.imgListTouch = {
                active: true,
                start: pos,
                end: pos,
            }
        },
        imgListTouchMove(e) {
            let pos = this.getPointPos(e)
            if (this.scale == 1 && this.imgListTouch.active) {
                const difX = -(this.imgListTouch.end.x - pos.x) || 0
                this.imgListTouch.end = pos
                this.$refs.imglist.style.transition = 'none'
                let t = this.imgListTranslateX + difX
                const minDistance = 100
                const maxDistance = -(this.maxTranslateWidth + 100)
                //边界判断
                t = t > minDistance ? minDistance : t < maxDistance ? maxDistance : t
                this.imgListTranslateX = t
            }
        },
        imgListTouchEnd(e) {
            this.imgListTouch.active = false
            this.$refs.imglist.style.transition = 'all .5s'
            //超出边界回弹
            let t = this.imgListTranslateX < (-this.maxTranslateWidth) ? (-this.maxTranslateWidth) : this.imgListTranslateX > 0 ? 0 : this.imgListTranslateX
            this.imgListTranslateX = t

            //根据移动距离判断是下一个、上一个、还是恢复原位置
            if (this.imgListMoveDistance > 50) {
                let index = this.currentIndex + 1
                index = index > (this.imgList.length - 1) ? (this.imgList.length - 1) : index
                this.currentIndex = index
            } else if (this.imgListMoveDistance < -50) {
                let index = this.currentIndex - 1
                index = index < 0 ? 0 : index
                this.currentIndex = index
            } else {
                this.imgListTranslateX = -(this.containerWidth * this.currentIndex)
            }
        },
        imgListTouchcancel(e) {
            this.imgListTouchEnd()
        },
    }
}
</script>
<style scoped>
.v-img {
    position: relative;
    transition: all .5s;
    transform: translateZ(0);
    font-size: 0;
}

.v-img>.img {
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: auto;
}

.v-img>.title {
    position: relative;
    top: -5px;
    text-align: center;
    font-size: 12px;
    color: #999;
    padding-bottom: 5px;
    word-break: break-all;
}

.v-img-zoom {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    opacity: 0;
    /* overflow: auto; */
}

.v-img-zoom.open {
    opacity: 1;
    pointer-events: all;
}

.v-img-mask {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 1);
    transition: all .3s;
    opacity: 0;
}

.img-list {
    position: relative;
    width: 100%;
    height: 100%;
    white-space: nowrap;
}

.img-list>.img-box {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
}

.zoom-img {
    position: absolute;
    z-index: 1;
    width: 100%;
    max-width: 750px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
}

.v-img-zoom>.indicator {
    position: absolute;
    z-index: 2;
    top: 20px;
    right: 20px;
    font-size: 15px;
    color: #fff;
}
</style>