import { ref, nextTick, type Ref } from 'vue';
import { ElTable } from 'element-plus';

const useElTableSelection = <T = string | number>(
  getPage: () => number,
  tableData: Ref<any[]>,
  key = 'id'
) => {
  let allPageSelection: T[][] = [];
  const multipleSelection: Ref<T[]> = ref([]);
  const onSelectionChange = (val: any[]) => {
    multipleSelection.value = val;

    const page = getPage();
    allPageSelection[page - 1] = val.map((item) => item[key]);
  };

  const clearSelection = () => {
    multipleSelection.value = [];
    allPageSelection = [];
  };

  const multipleTableRef = ref<InstanceType<typeof ElTable>>();
  const revertSelection = () => {
    const page = getPage();
    const historySelection = allPageSelection[page - 1];
    if (!historySelection || !historySelection.length) {
      return;
    }

    nextTick(() => {
      const data = tableData.value.filter((item) =>
        historySelection.includes(item[key])
      );

      data.forEach((item) => {
        // item必须要是引用表格绑定数据的一项，否则无法选中
        multipleTableRef.value?.toggleRowSelection(item, true);
      });
    });
  };

  return {
    multipleTableRef,
    multipleSelection,
    allPageSelection,
    onSelectionChange,
    revertSelection,
    clearSelection
  };
};

export default useElTableSelection;
