<script setup>
import { onMounted } from 'vue';

/**
 * 轮播图切换
 * @param {number} idx 要切换到的索引
 * @param {(idx: number) => void} changeIdx 最后一个切换到第一个时或
 * 第一个切换到最后一个时的回调函数，参数为当前索引
 * @param {number} duration 动画时长，单位ms（默认500ms）
 */
function swiperTo(idx, changeIdx, duration = 500) {
  const ele = document.querySelector('.swiper-wrapper');
  if (!ele || ele.style.display === 'none') {
    return;
  }

  const itemWidth = ele.clientWidth;
  const moveDistance = -idx * itemWidth;

  ele.setAttribute(
    'style',
    `transition-duration: ${duration}ms; transform: translateX(${moveDistance}px);`
  );

  const itemTotal = ele.childElementCount;
  // 从最后一个切换到第一个，需要做特殊处理，以实现无缝滚动的效果
  if (idx === itemTotal) {
    // 将第一个子元素移动到最后一个元素的后面
    const childStyle = ele.children[0].getAttribute('style') ?? '';
    const styleStr = childStyle.replace('[object CSSStyleDeclaration];', '');

    ele.children[0].setAttribute(
      'style',
      `${styleStr};transform: translateX(${-moveDistance}px);`
    );

    if (typeof changeIdx === 'function') {
      changeIdx(0);
    }

    // 当移动到第一项时，等动画结束后，重置样式
    setTimeout(() => {
      ele.setAttribute('style', `transform: translateX(0px);`);

      ele.children[0].setAttribute('style', styleStr);
    }, duration);
    return;
  }

  // 从第一个切换到最后一个，做特殊处理以实现无缝滚动效果
  if (idx === -1) {
    const lastIdx = itemTotal - 1;
    const moveWidth = lastIdx * itemWidth;
    const childStyle = ele.children[lastIdx].getAttribute('style') ?? '';
    const styleStr = childStyle.replace('[object CSSStyleDeclaration];', '');

    ele.children[lastIdx].setAttribute(
      'style',
      `${styleStr}transform: translateX(-${itemWidth * itemTotal}px);`
    );

    if (typeof changeIdx === 'function') {
      changeIdx(lastIdx);
    }

    setTimeout(() => {
      ele.setAttribute('style', `transform: translateX(-${moveWidth}px);`);
      ele.children[lastIdx].setAttribute('style', styleStr);
    }, duration);
  }
}

/**
 * 切换指示器
 * @param {number} idx 要切换到的索引
 */
function changeIndicator(idx) {
  const swiperIndicator = document.querySelector('.swiper-indicator');
  const indicatorList = swiperIndicator.children;
  const itemTotal = indicatorList.length;

  if (idx > itemTotal) {
    idx = 0;
  } else if (idx < 0) {
    idx = itemTotal - 1;
  }

  for (let i = 0; i < itemTotal; i++) {
    if (i === idx) {
      indicatorList[i].className =
        'swiper-indicator-item swiper-indicator-item--active';
    } else {
      indicatorList[i].className = 'swiper-indicator-item';
    }
  }
}

// 使用原生js/jQuery写html页面时，可以在这里调用swiperTo()和changeIndicator()方法
// document.addEventListener('DOMContentLoaded', () => {
//   // 这里的代码会在页面DOM加载完成后执行
//   let index = 0;

//   setInterval(() => {
//     index++;
//     swiperTo(index, (idx) => {
//       index = idx;
//     });
//     changeIndicator(index);
//   }, 2000);
// });

onMounted(() => {
  let index = 0;

  setInterval(() => {
    index++;
    swiperTo(index, (idx) => {
      index = idx;
    });
    changeIndicator(index);
  }, 5000);
});
</script>

<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" style="background-color: rgb(196, 221, 243)">
        1
      </div>
      <div class="swiper-slide" style="background-color: rgb(204, 126, 194)">
        2
      </div>
      <div class="swiper-slide" style="background-color: rgb(235, 240, 148)">
        3
      </div>
      <div class="swiper-slide" style="background-color: rgb(196, 243, 203)">
        4
      </div>
    </div>
    <div class="swiper-indicator">
      <div class="swiper-indicator-item swiper-indicator-item--active"></div>
      <div class="swiper-indicator-item"></div>
      <div class="swiper-indicator-item"></div>
      <div class="swiper-indicator-item"></div>
    </div>
  </div>
</template>

<style scoped>
.swiper-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100px;
  border-radius: 20px;
}

.swiper-wrapper {
  display: flex;
  height: 100%;
}

.swiper-slide {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-indicator {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 9;
}

.swiper-indicator-item {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: #fff;
  transition: background-color 0.3s ease-in-out;
}

.swiper-indicator-item--active {
  background-color: #f8b62c;
}
</style>
