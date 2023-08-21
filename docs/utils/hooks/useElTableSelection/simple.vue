<script lang="ts" setup>
import { ref } from 'vue';
import { useElTableSelection } from '@stao-ui/utils';
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
// import 'element-plus/es/components/table/style/css';
// import 'element-plus/es/components/table-column/style/css';
// import 'element-plus/es/components/pagination/style/css';
import 'element-plus/dist/index.css'

const pag = ref({
  pageNum: 1,
  pageSize: 5
});
const total = ref(0);
const list = ref<{ id: number; birthday: string; name: string }[]>([]);

const { onSelectionChange, multipleTableRef, revertSelection } =
  useElTableSelection(() => pag.value.pageNum, list);

const getList = () => {
  total.value = 30;
  list.value = Array.from({ length: pag.value.pageSize }).map((_, i) => ({
    id: (i + 1) * pag.value.pageNum,
    birthday: '2021-01-01',
    name: `name${(i + 1) * pag.value.pageNum}`
  }));

  revertSelection();
};

const onCurrentChange = (val: number) => {
  pag.value.pageNum = val;
  getList();
};

getList();
</script>

<template>
  <div class="container">
    <client-only>
      <el-table
        ref="multipleTableRef"
        border
        :data="list"
        @select-all="onSelectionChange"
        @select="onSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="id" align="center" prop="id" />
        <el-table-column label="生日" align="center" prop="birthday" />
        <el-table-column label="姓名" align="center" prop="name" />
      </el-table>

      <el-pagination
        v-model:current-page="pag.pageNum"
        v-model:page-size="pag.pageSize"
        :total="total"
        @current-change="onCurrentChange" />
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
}

:deep(.el-pager li) {
  margin-top: 0;
  background: transparent !important;
}
:deep(.el-table__header-wrapper table) {
  margin: 0;
}
:deep(.el-table__body-wrapper table) {
  margin: 0;
}
:deep(.el-table) {
  background-color: transparent;
}
:deep(.el-table tr) {
  background-color: transparent;
}
:deep(.el-table th.el-table__cell) {
  background-color: transparent;
}
:deep(.el-pagination button) {
  background: transparent !important;
}
</style>
