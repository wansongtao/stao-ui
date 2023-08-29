/**
 * 希尔排序，改变原数组
 * @param arr 
 * @param compare 比较函数，默认升序
 * @returns 
 */
function shellSort<T = unknown>(
  arr: T[],
  compare: (a: T, b: T) => boolean = (a, b) => a > b
) {
  const len = arr.length;
  if (len <= 1) return arr;

  let gap = 1;
  while (gap < len / 3) {
    gap = gap * 3 + 1;
  }

  do {
    for (let i = gap; i < len; i++) {
      const temp = arr[i];
      let prev = i - gap;

      while (prev >= 0 && compare(arr[prev], temp)) {
        arr[prev + gap] = arr[prev];
        prev -= gap;
      }

      arr[prev + gap] = temp;
    }

    // 重新计算间隔序列
    gap = (gap - 1) / 3;
  } while (gap >= 1);

  return arr;
}
