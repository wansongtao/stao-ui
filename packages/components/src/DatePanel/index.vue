<script lang="ts" setup>
import { ref, watch } from 'vue';
import dayjs from 'dayjs';

defineOptions({
  name: 'DatePanel'
});

const $props = defineProps<{
  title?: string;
  activeKey?: string;
}>();
const $emits = defineEmits<{
  changeDate: [
    dates: {
      startDate: string;
      endDate: string;
    }
  ];
}>();

type IDateText = 'week' | 'lastWeek' | 'month' | 'lastMonth' | 'year';

/**
 * 将键值转换为对应的日期
 * @param text
 */
const textToDate = (text: IDateText) => {
  const now = dayjs();
  let endDate = now.format('YYYY-MM-DD');

  const strategies = {
    week: () => {
      const week = now.toDate().getDay() - 1;
      const startDate = now.subtract(week, 'day').format('YYYY-MM-DD');

      return {
        startDate,
        endDate
      };
    },
    lastWeek: () => {
      const week = now.toDate().getDay() - 1;
      const startDate = now.subtract(week + 7, 'day').format('YYYY-MM-DD');
      endDate = now.subtract(week + 1, 'day').format('YYYY-MM-DD');

      return {
        startDate,
        endDate
      };
    },
    month: () => {
      const startDate = now.startOf('M').format('YYYY-MM-DD');

      return {
        startDate,
        endDate
      };
    },
    lastMonth: () => {
      const startDate = now.subtract(1, 'M').startOf('M').format('YYYY-MM-DD');
      endDate = dayjs(startDate).endOf('M').format('YYYY-MM-DD');

      return {
        startDate,
        endDate
      };
    },
    year: () => {
      const startDate = now.startOf('y').format('YYYY-MM-DD');

      return {
        startDate,
        endDate
      };
    }
  };

  return strategies[text]();
};

const toolMenu: readonly {
  readonly label: string;
  readonly value: IDateText;
}[] = [
  {
    label: '本周',
    value: 'week'
  },
  {
    label: '上周',
    value: 'lastWeek'
  },
  {
    label: '本月',
    value: 'month'
  },
  {
    label: '上月',
    value: 'lastMonth'
  },
  {
    label: '本年',
    value: 'year'
  }
];

const activeIdx = ref<number | undefined>();
const onChange = (idx: number) => {
  activeIdx.value = idx;
  const dateObj = textToDate(toolMenu[idx].value);

  $emits('changeDate', { ...dateObj });
};

watch(
  () => $props.activeKey,
  (val) => {
    const idx = toolMenu.findIndex(
      (item) => item.value === val || item.label === val
    );

    activeIdx.value = idx;
  },
  {
    immediate: true
  }
);
</script>

<template>
  <div class="flexbox">
    <div class="date_panel_title" v-if="title">{{ title }}</div>
    <div
      class="date_panel_item"
      v-for="(item, idx) in toolMenu"
      :key="idx"
      :class="{
        'date_panel_item--active': activeIdx === idx
      }"
      @click="onChange(idx)">
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flexbox {
  display: flex;
  align-items: center;
}

.date_panel_title {
  margin-right: 20px;
  color: #666;
}

.date_panel_item {
  padding: 5px 16px;
  margin-right: 12px;
  color: #666;
  line-height: 22px;
  cursor: pointer;

  &:hover {
    background-color: #f2f3f5;
    border-radius: 15px;
    color: #165dff;
  }
}

.date_panel_item--active {
  background-color: #f2f3f5;
  border-radius: 15px;
  color: #165dff;
}
</style>
