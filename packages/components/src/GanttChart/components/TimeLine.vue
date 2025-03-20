<script lang="ts" setup>
export interface ITimeLine {
  title?: string
  text: string
}

export interface IGuideline {
  beginTime: string
  endTime: string
  width: number
  height: number
  left: number
}

defineProps<{
  width: number
  list: ITimeLine[]
  guidelines?: IGuideline
}>()
</script>

<template>
  <div class="time-line" :style="`width: ${width}px`">
    <div v-for="(item, index) in list" :key="index" style="flex: 1">
      <div class="title">{{ item.title }}</div>
      <div class="divide"></div>
      <div style="display: flex">
        <div class="line" style="height: 20px">{{ item.text }}</div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div
          class="line"
          :style="index === list.length - 1 ? 'border-right: 1px solid #bebcbc;' : ''"
        ></div>
      </div>
    </div>

    <div
      v-if="guidelines?.width"
      class="guidelines"
      :style="`left: ${guidelines.left}px; width: ${guidelines.width}px; height: ${guidelines.height}px; pointer-events: none;`"
    >
      <span style="left: 0; transform: translate3d(-50%, -50%, 0)">
        {{ guidelines.beginTime }}
      </span>
      <span
        style="transform: translate3d(50%, -50%, 0)"
        :style="guidelines.width < 30 ? 'right: -24px' : 'right: 0; '"
      >
        {{ guidelines.endTime }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.time-line {
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  font-size: 12px;
  color: #333;
  transition: all 0.5s ease-in-out 0s;

  .title {
    height: 20px;
    transform: scale(0.8);
    transform-origin: left;
  }

  .divide {
    width: 100%;
    height: 1px;
    background-color: #bebcbc;
  }

  .line {
    box-sizing: border-box;
    flex: 1;
    align-items: flex-end;
    padding-left: 2px;
    padding-top: 10px;
    height: 10px;
    border-left: 1px solid #bebcbc;
  }

  .guidelines {
    position: absolute;
    top: 20px;
    user-select: none;
    z-index: 10;
    border-left: 1px dashed #f0f;
    border-right: 1px dashed #f0f;
    transition: all 0.2s ease 0s;

    span {
      position: absolute;
      top: 0;
      padding: 2px 4px;
      background: #ffccff;
      font-size: 12px;
      border-radius: 4px;
    }
  }
}
</style>
