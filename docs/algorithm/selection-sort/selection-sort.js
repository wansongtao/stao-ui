/**
 * 选择排序，改变原数组
 * @param {any[]} arr 
 * @param {(a, b) => boolean} [compare] 比较函数，默认升序
 * @returns 
 */
function selectionSort(arr, compare = (a, b) => a > b) {
  const len = arr.length;

  // 从第一个元素开始，找出最小(大)的元素，只需要比较len - 1次
  for (let i = 0; i < len - 1; i++) {
    // 将当前值作为极值，依次与后面的元素比较，找出极值的索引
    let extremeIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (compare(arr[extremeIndex], arr[j])) {
        extremeIndex = j;
      }
    }

    // 如果极值索引不是当前索引，则交换两个元素
    if (extremeIndex !== i) {
      [arr[i], arr[extremeIndex]] = [arr[extremeIndex], arr[i]];
    }
  }

  return arr;
}
