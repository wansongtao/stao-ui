/**
 * 希尔排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compare 比较函数，默认升序
 * @returns
 */
function shellSort(arr, compare = (a, b) => a > b) {
  const len = arr.length;
  if (len <= 1) return arr;

  // 动态定义间隔序列，gap等于1时，就是普通的插入排序
  let gap = 1;
  while (gap < len / 3) {
    gap = gap * 3 + 1;
  }

  do {
    // 从第 gap 个元素开始，依次插入到前面已排序的数组中(假设 gap 索引前的元素已排序)
    for (let i = gap; i < len; i++) {
      const temp = arr[i];
      let prev = i - gap;

      // 从后往前遍历，找到比 temp 小的元素，将其后移
      while (prev >= 0 && compare(arr[prev], temp)) {
        arr[prev + gap] = arr[prev];
        prev -= gap;
      }

      // 不管是否有元素后移，都将 temp 插入到正确的位置
      arr[prev + gap] = temp;
    }

    // 重新计算间隔序列
    gap = (gap - 1) / 3;
  } while (gap >= 1);

  return arr;
}
