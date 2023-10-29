/**
 * 冒泡排序，改变原数组
 * @param arr
 * @param compare 比较函数，默认升序
 * @returns
 */
export default function bubbleSort<T = unknown>(
  arr: T[],
  compare: (a: T, b: T) => boolean = (a, b) => a > b
) {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
