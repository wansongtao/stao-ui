/**
 * 冒泡排序，改变原数组
 * @param arr
 * @param compare 比较函数: a > b 升序，b > a 降序，默认升序
 * @returns
 */
function bubbleSort<T = unknown>(arr: T[], compare?: (a: T, b: T) => boolean) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }

  compare = compare || ((a: T, b: T) => a > b);

  for (let i = 0; i < len - 1; i++) {
    // 每进行一次内循环，都可以找出一个极值，所以内循环的次数可以减少
    for (let j = 0; j < len - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
