<script lang="ts" setup>
import { onMounted } from 'vue';
import { changeCarousel } from '@stao-ui/utils';

/**
 * 切换指示器
 * @param {object} options
 * @param {HTMLElement} options.ele 指示器容器元素
 * @param {number} options.index 要切换到的索引
 * @param {string} options.activeClass 激活状态的类名
 * @param {string} options.inactiveClass 非激活状态的类名
 */
function changeIndicator({
  ele,
  index,
  activeClass,
  inactiveClass
}: {
  ele: HTMLElement;
  index: number;
  activeClass: string;
  inactiveClass: string;
}) {
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

onMounted(() => {
  let index = 0;
  const ele = document.querySelector('.wrapper') as HTMLElement;
  const indicator = document.querySelector('.s-indicator') as HTMLElement;

  const autoPlay = () => {
    setInterval(() => {
      index++;
      changeCarousel({
        index,
        ele,
        timingFunc: 'ease-in-out'
      });

      if (index >= ele.childElementCount) {
        index = 0;
      }

      if (index < 0) {
        index = ele.childElementCount - 1;
      }

      changeIndicator({
        ele: indicator,
        index,
        activeClass: 'indicator-item--active',
        inactiveClass: 'indicator-item'
      });
    }, 5000);
  };

  autoPlay();
});
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <div class="slide" style="background-color: rgb(196, 221, 243)">1</div>
      <div class="slide" style="background-color: rgb(204, 126, 194)">2</div>
      <div class="slide" style="background-color: rgb(235, 240, 148)">3</div>
      <div class="slide" style="background-color: rgb(196, 243, 203)">4</div>
    </div>
    <div class="s-indicator">
      <div class="indicator-item indicator-item--active"></div>
      <div class="indicator-item"></div>
      <div class="indicator-item"></div>
      <div class="indicator-item"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100px;
  border-radius: 20px;
}

.wrapper {
  display: flex;
  height: 100%;
}

.slide {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.s-indicator {
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

.indicator-item {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: #fff;
  transition: background-color 0.3s ease-in-out;
}

.indicator-item--active {
  background-color: #f8b62c;
}
</style>
