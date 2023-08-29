/**
 * 冒泡排序，改变原数组
 * @param {any[]} arr 
 * @param {(a, b) => boolean} [compare] 比较函数，默认升序
 * @returns 
 */
function bubbleSort(arr, compare = (a, b) => a > b) {
  const len = arr.length;

  // 从第一个元素开始，依次比较相邻的两个元素，只需要比较len - 1次
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
