/**
 * 选择排序，改变原数组
 * @param {any[]} arr 
 * @param {(a, b) => boolean} [compare=(a, b) => a > b] 比较函数，默认升序
 * @returns 
 */
function selectionSort(arr, compare = (a, b) => a > b) {
  const len = arr.length;
  if (len <= 1) return arr;

  for (let i = 0; i < len - 1; i++) {
    let extremeIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (compare(arr[extremeIndex], arr[j])) {
        extremeIndex = j;
      }
    }
    if (extremeIndex !== i) {
      [arr[i], arr[extremeIndex]] = [arr[extremeIndex], arr[i]];
    }
  }

  return arr;
}
