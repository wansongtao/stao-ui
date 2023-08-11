<script setup>
import { onMounted } from 'vue';

/**
 * 轮播图切换
 * @param {object} options
 * @param {HTMLElement} options.ele 轮播图容器元素
 * @param {number} options.index 要切换到的索引
 * @param {(idx: number) => void} options.changeIdx 最后一个切换到第一个时或
 * 第一个切换到最后一个时的回调函数，参数为当前索引
 * @param {'horizontal' | 'vertical'} options.direction
 * @param {number} options.duration 动画时长，单位ms（默认500ms）
 */
function changeCarousel({
  index,
  ele,
  changeIdx,
  duration = 500,
  direction = 'horizontal'
}) {
  if (!ele || ele.style.display === 'none' || !ele.children.length) {
    return;
  }

  const itemSize =
    direction === 'horizontal' ? ele.clientWidth : ele.clientHeight;
  const translate = direction === 'horizontal' ? 'translateX' : 'translateY';

  const moveDistance = -index * itemSize;
  let style = ele.getAttribute('style') ?? '';
  if (style) {
    style = style.replace(
      /(transition-duration: [0-9]+ms;[ ]?)?(transform: translate[XY]\([-]?[0-9]+px\);[ ]?)?/g,
      ''
    );
  }

  ele.setAttribute(
    'style',
    `${style}transition-duration: ${duration}ms; transform: ${translate}(${moveDistance}px);`
  );

  const itemTotal = ele.childElementCount;
  // 从最后一个切换到第一个，需要做特殊处理，以实现无缝滚动的效果
  if (index === itemTotal) {
    // 将第一个子元素移动到最后一个元素的后面
    const childStyle = ele.children[0].getAttribute('style') ?? '';
    const styleStr = childStyle.replace('[object CSSStyleDeclaration];', '');

    ele.children[0].setAttribute(
      'style',
      `${styleStr};transform: ${translate}(${-moveDistance}px);`
    );

    if (typeof changeIdx === 'function') {
      changeIdx(0);
    }

    // 当移动到第一项时，等动画结束后，重置样式
    setTimeout(() => {
      ele.setAttribute('style', `${style}transform: ${translate}(0px);`);

      ele.children[0].setAttribute('style', styleStr);
    }, duration);
    return;
  }

  // 从第一个切换到最后一个，做特殊处理以实现无缝滚动效果
  if (index === -1) {
    const lastIdx = itemTotal - 1;
    const moveSize = lastIdx * itemSize;
    const childStyle = ele.children[lastIdx].getAttribute('style') ?? '';
    const styleStr = childStyle.replace('[object CSSStyleDeclaration];', '');

    ele.children[lastIdx].setAttribute(
      'style',
      `${styleStr}transform: ${translate}(-${itemSize * itemTotal}px);`
    );

    if (typeof changeIdx === 'function') {
      changeIdx(lastIdx);
    }

    setTimeout(() => {
      ele.setAttribute(
        'style',
        `${style}transform: ${translate}(-${moveSize}px);`
      );
      ele.children[lastIdx].setAttribute('style', styleStr);
    }, duration);
  }
}

/**
 * 切换指示器
 * @param {object} options
 * @param {HTMLElement} options.ele 指示器容器元素
 * @param {number} options.index 要切换到的索引
 * @param {string} options.activeClass 激活状态的类名
 * @param {string} options.inactiveClass 非激活状态的类名
 */
function changeIndicator({ ele, index, activeClass, inactiveClass }) {
  if (!ele || !ele.children.length || !activeClass || !inactiveClass) {
    return;
  }

  const indicatorList = ele.children;
  const itemTotal = indicatorList.length;

  if (index > itemTotal) {
    index = 0;
  } else if (index < 0) {
    index = itemTotal - 1;
  }

  for (let i = 0; i < itemTotal; i++) {
    if (i === index) {
      indicatorList[i].className = `${activeClass} ${inactiveClass}`;
    } else {
      indicatorList[i].className = inactiveClass;
    }
  }
}

// 使用原生js/jQuery写html页面时，可以在这里调用swiperTo()和changeIndicator()方法
// document.addEventListener('DOMContentLoaded', () => {
//   // 这里的代码会在页面DOM加载完成后执行
//   let index = 0;

//   setInterval(() => {
//     index++;
//     swiperTo(index, (index) => {
//       index = idx;
//     });
//     changeIndicator(index);
//   }, 2000);
// });

onMounted(() => {
  let index = 0;
  const ele = document.querySelector('.swiper-wrapper');
  const swiperIndicator = document.querySelector('.swiper-indicator');

  setInterval(() => {
    index++;
    changeCarousel({
      index,
      ele,
      changeIdx: (idx) => {
        index = idx;
      }
    });

    changeIndicator({
      ele: swiperIndicator,
      index,
      activeClass: 'swiper-indicator-item--active',
      inactiveClass: 'swiper-indicator-item'
    });
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

.vertical {
  flex-direction: column;
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
