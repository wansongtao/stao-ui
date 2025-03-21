<script lang="ts" generic="T extends IGanttChartItem" setup>
import { type Ref, computed, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { getTimeLineList, timeRangeToWidth } from './utils';
import { useGuideline } from './hooks/useGuideLine';
import { useSetMountRange } from './hooks/useSetMountRange';
import { useContextMenu } from './hooks/useContextMenu';

import TimeLine from './components/TimeLine.vue';
import StaticTable from './components/StaticTable.vue';

import type { ITimeLine } from './components/TimeLine.vue';

export interface IGanttChartConfig {
  /**
   * 每小时宽度，比例尺 1:30(放大30倍)，单位：px
   */
  hourWidth: 1 | 2 | 3 | 4 | 5 | 6;
  beginDate: string;
  endDate: string;
  /**
   * 甘特图高度
   */
  height: number;
  /**
   * 行高度
   */
  lineHeight: number;
}

export interface IGanttChartItem {
  id: number | string;
  beginTime: string;
  endTime: string;
  /**
   * 块的自定义样式
   */
  style?: string;
  /**
   * row - 一行里的所有块视为一个整体，col - 一行里的每个快都是独立的
   */
  mode?: 'row' | 'col';
  /**
   * 禁用后，则不打开右键菜单
   */
  disabled?: boolean;
}

type IProps = {
  /**
   * 需要重新渲染整个甘特图的相关配置
   */
  config?: Partial<IGanttChartConfig>;
  canSelect?: boolean;
  checked?: T['id'][];
  data?: T[][];
  scrollIndexMap?: {
    rowIndex: number;
    colIndex: number;
  };
  defaultPagesize?: number;
};

type IClickItem = {
  indexMap: { pIndex: number; cIndex: number };
  data: T;
};

const $props = defineProps<IProps>();
const $emits = defineEmits<{
  click: [data: IClickItem];
  dblclick: [data: IClickItem];
  contextmenu: [data: IClickItem];
  'update:checked': [ids: T['id'][]];
}>();

const DEFAULT_HOUR_WIDTH = 1;
const DEFAULT_BEGIN_DATE = dayjs().startOf('day').format('YYYY-MM-DD');
const DEFAULT_END_DATE = dayjs()
  .endOf('day')
  .add(2, 'day')
  .format('YYYY-MM-DD');
const DEFAULT_GANTT_CHART_HEIGHT = 400;
const DEFAULT_LINE_HEIGHT = 35;
const DEFAULT_PAGESIZE = 40;
const HOUR_WIDTH_RATIO = 30;
const MAX_WIDTH = document.body.clientWidth;

const { onSetGuideLine, guidelines } = useGuideline();

// eslint-disable-next-line vue/no-setup-props-destructure
const { mountRange, initMountRange, onSetMountLineRange } = useSetMountRange(
  $props?.defaultPagesize ?? DEFAULT_PAGESIZE
);
const { contextmenuInfo, contextRef, onContextmenu, onCloseContextMenu } =
  useContextMenu<IClickItem>(
    (v) => !v.data.disabled,
    (v) => {
      $emits('contextmenu', v);
    }
  );

const ganttConfig = ref(initGanttConfig());
watch(
  () => $props.config,
  (newProps) => {
    ganttConfig.value = { ...initGanttConfig(), ...newProps };
  },
  { immediate: true, deep: true }
);

const timeLineList = ref<ITimeLine[]>([]);
const cells = computed(() => {
  return timeLineList.value.length * 3;
});
watch(
  [() => ganttConfig.value.beginDate, () => ganttConfig.value.endDate],
  ([beginDate, endDate]) => {
    timeLineList.value = getTimeLineList(beginDate, endDate);
  },
  { immediate: true }
);

const hourWidth = ref(0);
watch(
  () => ganttConfig.value.hourWidth,
  (n) => {
    hourWidth.value = n * HOUR_WIDTH_RATIO;
  },
  { immediate: true }
);

const ganttChartWidth = computed(() => {
  return timeLineList.value.length * 6 * hourWidth.value;
});
const lines = computed(() => {
  return Math.ceil(ganttConfig.value.height / ganttConfig.value.lineHeight);
});

const checkList = ref(new Set<IGanttChartItem['id']>());
watch(
  () => $props.checked,
  (list) => {
    if (!list || !list.length) {
      checkList.value.clear();
      return;
    }

    checkList.value = new Set(list);
  },
  { immediate: true, deep: true }
);

const onChecked = (selected: IClickItem) => {
  if (!$props.canSelect) {
    $emits('click', selected);
    return;
  }

  const id = selected.data.id;
  if (checkList.value.has(id)) {
    checkList.value.delete(id);
  } else {
    checkList.value.add(id);
  }

  const list = Array.from(checkList.value);
  $emits('update:checked', list);
  $emits('click', selected);
};

type IGanttChartListItem = ({
  left: number;
  width: number;
  style: string;
} & T)[][];

const ganttChartList: Ref<IGanttChartListItem> = ref([]);
const horizontalScrollElement = ref<HTMLDivElement>();
const verticalScrollElement = ref<HTMLDivElement>();
const initGanttChart = () => {
  onCloseContextMenu();
  initMountRange();
  ganttChartList.value = [];
  
  if (!$props.data?.length) {
    horizontalScrollElement.value?.scroll({ left: 0 });
    verticalScrollElement.value?.scroll({ top: 0 });
    return;
  }

  const list = transformData(ganttConfig.value, $props.data, hourWidth.value);
  ganttChartList.value = list;

  // 滚动到指定区域
  let rowIndex = $props.scrollIndexMap?.rowIndex ?? 0;
  if (rowIndex < 0 || rowIndex > ganttChartList.value.length - 1) {
    rowIndex = 0;
  }
  let colIndex = $props.scrollIndexMap?.colIndex ?? 0;
  if (colIndex < 0 || colIndex > ganttChartList.value[rowIndex].length - 1) {
    colIndex = 0;
  }
  const left =
    ganttChartList.value[rowIndex][colIndex].left - hourWidth.value * 10;
  const top = ganttConfig.value.lineHeight * rowIndex;
  horizontalScrollElement.value?.scroll({ left });
  verticalScrollElement.value?.scroll({ top });
};
watch([() => $props.data, ganttConfig, hourWidth], initGanttChart, {
  immediate: true,
  deep: true
});

function initGanttConfig() {
  const option: IGanttChartConfig = {
    hourWidth: DEFAULT_HOUR_WIDTH,
    beginDate: DEFAULT_BEGIN_DATE,
    endDate: DEFAULT_END_DATE,
    height: DEFAULT_GANTT_CHART_HEIGHT,
    lineHeight: DEFAULT_LINE_HEIGHT
  };

  return option;
}

/**
 * 将传入的列表数据转换为可以渲染的数据
 * @param config
 * @param hourWidth
 */
function transformData(
  config: IGanttChartConfig,
  data: IProps['data'],
  hourWidth: number
) {
  const chartList: IGanttChartListItem = [];
  if (!data || !data.length) {
    return chartList;
  }

  data.forEach((parents, i) => {
    chartList.push([]);

    parents.forEach((v) => {
      const left = timeRangeToWidth(config.beginDate!, v.beginTime, hourWidth);
      const width = timeRangeToWidth(v.beginTime, v.endTime, hourWidth);

      let style = v.style ?? '';
      // 减 8 是为了留出边框高度
      style += `transform: translate3d(${left}px, -50%, 0);width: ${width}px; 
      height: ${config.lineHeight - 8}px;`;

      chartList[i].push({
        ...v,
        left,
        width,
        style
      });
    });
  });

  return chartList;
}
</script>

<template>
  <div :style="`max-width: ${MAX_WIDTH}px;`">
    <div class="gantt-chart" ref="horizontalScrollElement">
      <time-line
        :width="ganttChartWidth"
        :list="timeLineList"
        :guidelines="guidelines" />

      <static-table
        :table-width="ganttChartWidth"
        :cell-width="hourWidth"
        :lines="lines"
        :cells="cells"
        :line-height="ganttConfig.lineHeight" />

      <!-- 渲染甘特图容器 -->
      <div
        ref="verticalScrollElement"
        class="gantt-chart-container"
        :style="`width: ${ganttChartWidth}px; height: ${ganttConfig.height}px`"
        @scroll="onSetMountLineRange($event, ganttConfig.lineHeight)">
        <div class="gantt-chart-scroll">
          <div
            v-for="(item, index) in ganttChartList"
            :key="index"
            class="gantt-chart-scroll-item"
            :style="`height: ${ganttConfig.lineHeight}px;`">
            <template
              v-if="
                !mountRange.endLine ||
                (index >= mountRange.beginLine && index <= mountRange.endLine)
              ">
              <div
                v-for="(v, i) in item"
                :key="v.id || i"
                :style="v.style"
                class="chart"
                :class="{
                  'border--top': checkList.has(v.id),
                  'border--bottom': checkList.has(v.id),
                  'border--left':
                    checkList.has(v.id) && (v.mode !== 'row' || i === 0),
                  'border--right':
                    checkList.has(v.id) &&
                    (v.mode !== 'row' || i === item.length - 1),
                  'border--orange': checkList.has(v.id)
                }"
                @mousemove="
                  onSetGuideLine({ ...v, height: ganttConfig.height + 50 })
                "
                @click="
                  onChecked({ indexMap: { pIndex: index, cIndex: i }, data: v })
                "
                @dblclick="
                  $emit('dblclick', {
                    indexMap: { pIndex: index, cIndex: i },
                    data: v
                  })
                "
                @contextmenu="
                  onContextmenu(
                    $event,
                    { indexMap: { pIndex: index, cIndex: i }, data: v },
                    ganttConfig.lineHeight
                  )
                ">
                <div v-if="i === 0" class="chart-icon">
                  <slot name="row-icon" :data="v"></slot>
                </div>

                <slot :data="v" :index="{ pIndex: index, cIndex: i }" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-show="contextmenuInfo.show"
    ref="contextRef"
    class="gantt-context-menu"
    :class="{
      'gantt-content-menu--bottom': contextmenuInfo.direction === 'bottom'
    }"
    :style="{ left: contextmenuInfo.left, top: contextmenuInfo.top }">
    <slot name="contextMenu" :data="contextmenuInfo.data"></slot>
  </div>
</template>

<style lang="scss" scoped>
.gantt-chart {
  position: relative;
  overflow-x: auto;

  .gantt-chart-container {
    position: absolute;
    top: 50px;
    overflow-y: auto;
  }
}

.gantt-chart-scroll {
  width: 100%;

  .gantt-chart-scroll-item {
    position: relative;
    width: 100%;
  }
}

.chart {
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  align-items: center;
  background-color: #90cfb9;
  font-size: 12px;
  color: #fff;
  text-align: center;
  user-select: none;
  transition: all 0.5s ease-in-out 0s;

  .chart-icon {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate3d(-100%, -50%, 0);
    padding-right: 5px;
  }
}

.border--top {
  border-top: 2px dashed transparent;
}
.border--bottom {
  border-bottom: 2px dashed transparent;
}
.border--left {
  border-left: 2px dashed transparent;
}
.border--right {
  border-right: 2px dashed transparent;
}

.border--orange {
  border-color: orange;
}

.gantt-context-menu {
  position: absolute;
  z-index: 11;
  transform: translate3d(-50%, -100%, 0);
  box-sizing: border-box;
  padding: 5px 10px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.24);

  &:after {
    position: absolute;
    bottom: -5px;
    right: calc(50% - 5px);
    width: 10px;
    height: 10px;
    z-index: -1;
    content: ' ';
    transform: rotate(45deg);
    box-sizing: border-box;
    border: 1px solid #e4e7ed;
    background: #fff;
    border-top-color: transparent;
    border-left-color: transparent;
    border-top-left-radius: 2px;
  }
}

.gantt-content-menu--bottom {
  transform: translate3d(-50%, 30px, 0);

  &:after {
    top: -5px;
    right: calc(50% - 5px);
    border-bottom-color: transparent;
    border-right-color: transparent;
  }
}
</style>
