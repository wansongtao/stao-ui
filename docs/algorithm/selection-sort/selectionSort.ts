/**
 * 选择排序，改变原数组
 * @param arr 
 * @param compare 比较函数，默认升序
 * @returns 
 */
export default function selectionSort<T = unknown>(
  arr: T[],
  compare: (a: T, b: T) => boolean = (a, b) => a > b
) {
  const len = arr.length;

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
