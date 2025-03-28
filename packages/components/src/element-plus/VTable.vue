<script lang="ts" generic="T extends Record<string, any> = any, K = ''" setup>
import { type CheckboxValueType, ElCheckbox, type RowClassNameGetter } from 'element-plus';
import { Loading as LoadingIcon } from '@element-plus/icons-vue';
import { computed, ref, watch } from 'vue';

import type { Column } from 'element-plus/es/components/table-v2/src/types.d.ts';

export type ITableColumn<T, K = ''> = Column<T> & {
  dataKey?: keyof T | K;
  key: keyof T | K;
  slotName?: string;
};

export interface SpanMethodProps<T> {
  row: T;
  rowIndex: number;
  columnIndex: number;
}

/**
 * 要想添加选择项，则 selection 、 rowKey 都不能为 falsely
 */
const $props = defineProps<{
  data: T[];
  total?: number;
  loading?: boolean;
  columns: ITableColumn<T, K>[];
  tableHeight?: number;
  selection?: boolean;
  rowKey?: keyof T;
  checked?: T[];
  rowClassName?: (rowData: T, rowIndex: number) => string;
  rowSpanMethod?: (data: SpanMethodProps<T>) =>
    | {
        rowspan: number;
        colspan: number;
      }
    | undefined;
}>();

const $emits = defineEmits<{
  'update:checked': [data: T[]];
}>();

const tableColumns = computed(() => {
  if (!$props.selection) {
    return $props.columns;
  }

  const selectionColumn: Column = {
    key: 'selection',
    align: 'center',
    width: 40,
  };

  return [selectionColumn, ...$props.columns];
});

const isAllChecked = ref(false);
const checkedList = ref(new Set<number | string>());

watch(
  () => $props.checked,
  (list) => {
    if (!$props.selection || !$props.rowKey || !list || checkedList.value.size === list.length) {
      return;
    }

    if (!list.length) {
      checkedList.value = new Set();
      isAllChecked.value = false;
      return;
    }

    const keys = list.map((v) => v[$props.rowKey!]);
    checkedList.value = new Set(keys);
  },
);

const onSelectionChange = (data: Set<string | number>) => {
  if (data.size === $props.data.length) {
    $emits('update:checked', $props.data);
    return;
  }

  if (!data.size) {
    $emits('update:checked', []);
    return;
  }

  const list = $props.data.filter((v) => data.has(v[$props.rowKey!]));
  $emits('update:checked', list);
};

const toggleAllSelection = (checked: CheckboxValueType) => {
  if (!checked) {
    isAllChecked.value = false;
    checkedList.value = new Set();
    onSelectionChange(checkedList.value);
    return;
  }

  isAllChecked.value = true;
  const keys = $props.data.map((item) => {
    return item[$props.rowKey!];
  });
  checkedList.value = new Set(keys);
  onSelectionChange(checkedList.value);
};

const toggleRowSelection = (row: T) => {
  const value = row[$props.rowKey!];
  if (checkedList.value.has(value)) {
    checkedList.value.delete(value);
  } else {
    checkedList.value.add(value);
  }

  if (checkedList.value.size === $props.data.length || checkedList.value.size === $props.total) {
    isAllChecked.value = true;
  } else {
    isAllChecked.value = false;
  }

  onSelectionChange(checkedList.value);
};

const onRowClick = ({ rowData }: { rowData: T }) => {
  if (!$props.rowKey) {
    return;
  }

  toggleRowSelection(rowData);
};

const rowClass = ({ rowIndex, rowData }: Parameters<RowClassNameGetter<any>>[0]) => {
  if (!$props.rowClassName) {
    return '';
  }

  return $props.rowClassName(rowData, rowIndex);
};

const Row = (data: { rowData: T; rowIndex: number; cells: any; columns: ITableColumn<T>[] }) => {
  if (!$props.rowSpanMethod) {
    return data.cells;
  }

  for (let i = 0; i < data.columns.length; i++) {
    const result = $props.rowSpanMethod({
      row: data.rowData,
      rowIndex: data.rowIndex,
      columnIndex: i,
    });

    if (!result || (!result.colspan && !result.rowspan)) {
      continue;
    }

    const { rowspan } = result;
    if (rowspan > 1 && data.rowIndex <= $props.data.length) {
      Object.assign(data.cells[i].props.style, {
        backgroundColor: 'var(--el-color-white)',
        height: `${rowspan * 50 - 1}px`,
        alignSelf: 'flex-start',
        zIndex: rowspan,
      });
    }
  }
  return data.cells;
};
</script>

<template>
  <div class="vtable">
    <el-auto-resizer>
      <template #default="{ width, height }">
        <el-table-v2
          :columns="tableColumns"
          :data="data"
          :width="width"
          :height="tableHeight ?? height"
          scrollbar-always-on
          :row-class="rowClass"
          :row-event-handlers="{
            onClick: onRowClick,
          }"
        >
          <template #row="props">
            <Row v-bind="props" />
          </template>

          <template v-if="selection" #header-cell="{ column }">
            <el-checkbox
              v-if="column.key === 'selection' && rowKey"
              :model-value="isAllChecked"
              :disabled="!data.length"
              :indeterminate="checkedList.size > 0 && !isAllChecked"
              @change="toggleAllSelection"
            />
          </template>
          <template #cell="{ column, rowData }">
            <el-checkbox
              v-if="column.key === 'selection' && rowKey"
              :model-value="checkedList.has(rowData[rowKey])"
              @click.stop
              @change="toggleRowSelection(rowData)"
            />
            <slot v-if="column?.slotName" :name="column.slotName" :row="rowData as T"></slot>
          </template>
          <template v-if="loading" #overlay>
            <div
              class="el-loading-mask"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 101%;
                height: 101%;
              "
            >
              <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                <loading-icon />
              </el-icon>
            </div>
          </template>
        </el-table-v2>
      </template>
    </el-auto-resizer>
  </div>
</template>

<style lang="scss" scoped>
.vtable {
  :deep(.el-vl__horizontal) {
    height: 0 !important;
  }

  :deep(.el-table-v2) {
    --el-table-border-color: #999;
  }

  :deep(.el-table-v2__main) {
    box-sizing: border-box;
    border: 1px solid var(--el-table-border-color);
  }

  :deep(.el-table-v2__header-cell) {
    box-sizing: border-box;
    background-color: #e0ecff;
    font-size: 14px;
    color: #333333;
    font-weight: 600;
    border-right: 1px solid var(--el-table-border-color);
  }

  :deep(.el-table-v2__main .el-table-v2__header-row:last-child) {
    border-right: none !important;
  }

  :deep(.el-table-v2__row-cell) {
    box-sizing: border-box;
    border-right: 1px solid var(--el-table-border-color);
  }
}
</style>
