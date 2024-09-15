export default function useCarousel() {
  const vimgCarouselEl = ref();
  const vimgCarouselBgEl = ref();
  const showCarousel = ref(false);
  const currentIndex = ref(0);

  const clickPoint = ref({
    active: false,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });
  let controller = {
    length: 1,
    closeing: false,
    prev,
    next,
    stopSlide: false,
    scrollToIndex,
    afterOpen: () => Promise.resolve(),
    beforeClose: () => Promise.resolve(),
    open() {
      showCarousel.value = true;
      nextTick(() => {
        scrollToIndex(currentIndex.value, 0);
        this.afterOpen();
      });
    },
    close() {
      if (this.closeing) {
        return;
      }
      this.closeing = true;
      this.beforeClose().then(() => {
        showCarousel.value = false;
        this.closeing = false;
      });
    },
  };

  function mouseStart(e: MouseEvent | TouchEvent) {
    let pos = getPointPos(e);
    clickPoint.value = {
      active: true,
      start: pos,
      end: pos,
    };
  }
  function mouseMove(e: MouseEvent | TouchEvent) {
    if (controller.stopSlide) {
      return;
    }
    if (!clickPoint.value.active) {
      return;
    }
    let pos = getPointPos(e);
    const difX = clickPoint.value.end.x - pos.x;
    const difY = clickPoint.value.end.y - pos.y;
    clickPoint.value.end = pos;
    let transform = getCarouselTransform();
    //拖动轮播容器
    vimgCarouselEl.value.style.transition = "none";
    vimgCarouselEl.value.style.transform = `translate(${
      transform.x + -difX
    }px,${transform.y + -difY}px)`;

    //拖动的同时更改背景透明度
    let opacity = (Number(vimgCarouselBgEl.value.style.opacity) || 1) - 0.01;
    vimgCarouselBgEl.value.style.transition = "none";
    vimgCarouselBgEl.value.style.opacity = Math.max(opacity, 0.5);
  }
  function mouseEnd(e?: MouseEvent | TouchEvent) {
    clickPoint.value.active = false;
    let transform = getCarouselTransform();
    const carouselItemWidth =
      vimgCarouselEl.value.clientWidth / controller.length;
    const difX = -(transform.x + carouselItemWidth * currentIndex.value);
    let changeDistance = carouselItemWidth * 0.1;

    vimgCarouselBgEl.value.style.transition = `all .5s`;
    vimgCarouselBgEl.value.style.opacity = 1;

    //拖到至上下一定距离后关闭
    if (Math.abs(transform.y) > vimgCarouselEl.value.clientHeight * 0.15) {
      controller.close();
      return;
    }
    //拖到至左右一定距离后关闭
    if (
      transform.x > carouselItemWidth * 0.4 ||
      vimgCarouselEl.value.clientWidth - Math.abs(transform.x) <
        carouselItemWidth * 0.8
    ) {
      controller.close();
      return;
    }

    if (difX < -changeDistance) {
      prev();
    } else if (difX > changeDistance) {
      next();
    } else {
      scrollToIndex(currentIndex.value);
    }
  }

  function mousecancel() {
    if (clickPoint.value.active) {
      clickPoint.value.active = false;
      mouseEnd();
    }
  }

  function getPointPos(e: MouseEvent | TouchEvent): { x: number; y: number } {
    let x = 0;
    let y = 0;
    if (e instanceof TouchEvent) {
      x = e.touches[0]?.clientX || 0;
      y = e.touches[0]?.clientY || 0;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    return { x, y };
  }

  function scrollToIndex(index = 0, duration = 0.3) {
    let scrollLeft =
      (vimgCarouselEl.value.clientWidth / controller.length) * index;
    vimgCarouselEl.value.style.transition = `all ${duration}s`;
    vimgCarouselEl.value.style.transform = `translateX(${-scrollLeft}px)`;
  }

  function prev() {
    console.log("prev");
    currentIndex.value = Math.max(0, currentIndex.value - 1);
    scrollToIndex(currentIndex.value);
  }
  function next() {
    console.log("next");
    currentIndex.value = Math.min(
      controller.length - 1,
      currentIndex.value + 1
    );
    scrollToIndex(currentIndex.value);
  }

  function getCarouselTransform(): { scale: number; x: number; y: number } {
    let str = window
      .getComputedStyle(vimgCarouselEl.value)
      .getPropertyValue("transform");
    if (str != "none") {
      let arr = str.replace("matrix(", "").replace(")", "").split(",");
      return {
        scale: Number(arr[0]),
        x: Number(arr[4]),
        y: Number(arr[5]),
      };
    }
    return {
      scale: 1,
      x: 0,
      y: 0,
    };
  }

  return {
    controller,
    vimgCarouselBgEl,
    vimgCarouselEl,
    showCarousel,
    currentIndex,
    mouseStart,
    mouseMove,
    mouseEnd,
    mousecancel,
  };
}
