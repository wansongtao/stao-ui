/**
 * 计数排序，改变原数组
 * @param arr 
 * @param isAsc 默认升序，false为降序
 * @returns 
 */
function countingSort(arr: number[], isAsc = true) {
  const min = Math.min(...arr);
  const countArr: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const index = arr[i] - min;
    if (!countArr[index]) {
      countArr[index] = 0;
    }
    countArr[index]++;
  }

  let index = 0;
  if (isAsc) {
    for (let i = 0; i < countArr.length; i++) {
      while (countArr[i] > 0) {
        arr[index++] = i + min;
        countArr[i]--;
      }
    }
    
    return arr;
  }

  for (let i = countArr.length - 1; i >= 0; i--) {
    while (countArr[i] > 0) {
      arr[index++] = i + min;
      countArr[i]--;
    }
  }
  return arr;
}
