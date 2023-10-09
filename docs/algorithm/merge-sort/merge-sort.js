// #region mergeSort
/**
 * 归并排序，不改变原数组
 * @param {any[]} arr 
 * @param {(a, b) => boolean} compare 比较函数，默认升序
 * @returns {any[]}
 */
function mergeSort(arr, compare = (a, b) => a > b) {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compare);
  const right = mergeSort(arr.slice(mid), compare);

  const result = [];
  let i = 0, j = 0;
  const rightLength = right.length;
  const leftLength = left.length;

  do {
    result.push(compare(left[i], right[j]) ? right[j++] : left[i++]);
  } while (i < leftLength && j < rightLength);
  return result.concat(i < leftLength ? left.slice(i) : right.slice(j));
}
// #endregion mergeSort

function mergeSortIterative (arr, compare = (a, b) => a > b) {
  function merge(arr, left, step, compare) {
    const right = left + step;
    const end = Math.min(left + step * 2 - 1, arr.length - 1);
    const leftEnd = right - 1;
    const temp = [];
    let i = left;
    let j = right;
    while (i <= leftEnd && j <= end) {
      temp.push(compare(arr[i], arr[j]) ? arr[j++] : arr[i++]);
    }
    while (i <= leftEnd) {
      temp.push(arr[i++]);
    }
    while (j <= end) {
      temp.push(arr[j++]);
    }
    for (let i = left; i <= end; i++) {
      arr[i] = temp[i - left];
    }
  }

  const len = arr.length;
  let step = 1;
  while (step < len) {
    let left = 0;
    while (left + step < len) {
      merge(arr, left, step, compare);
      left += step * 2;
    }
    step *= 2;
  }
  return arr;
}
