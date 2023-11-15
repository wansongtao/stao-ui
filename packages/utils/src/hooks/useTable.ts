import { ref, type Ref, watch, onActivated } from 'vue';

/**
 * 进入页面时自动请求表格数据，分页数据变化时自动请求表格数据
 * @param requestFn 
 * @param param1 默认分页参数，page: 1, pageSize: 10
 * @param isRefresh 是否在页面激活时刷新
 * @returns 
 */
export default function useTable<T = unknown>(
  requestFn: (params: {
    page: number;
    pageSize: number;
  }) => Promise<{ data: T[]; total: number }>,
  { defaultPage = 1, defaultPageSize = 10 },
  isRefresh = false
) {
  const tableData: Ref<T[]> = ref([]);
  const loading = ref(false);
  const total = ref(0);
  const page = ref(defaultPage);
  const pageSize = ref(defaultPageSize);

  const getTableData = () => {
    loading.value = true;
    const params = {
      page: page.value,
      pageSize: pageSize.value
    };

    requestFn(params)
      .then((res) => {
        tableData.value = res.data;
        total.value = res.total;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  watch(
    [page, pageSize],
    () => {
      getTableData();
    },
    { immediate: true }
  );

  if (isRefresh) {
    onActivated(() => {
      getTableData();
    });
  }

  return {
    tableData,
    total,
    loading,
    page,
    pageSize,
    getTableData
  };
}
