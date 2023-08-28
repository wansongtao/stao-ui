/**
 * 插入排序，改变原数组
 * @param arr 
 * @param compare 比较函数，默认升序
 * @returns 
 */
function insertionSort<T = unknown>(
  arr: T[],
  compare: (a: T, b: T) => boolean = (a, b) => a > b
) {
  const len = arr.length;

  for (let i = 1; i < len; i++) {
    const temp = arr[i];
    let prev = i - 1;

    while (prev >= 0 && compare(arr[prev], temp)) {
      arr[prev + 1] = arr[prev];
      prev--;
    }

    arr[prev + 1] = temp;
  }

  return arr;
}
