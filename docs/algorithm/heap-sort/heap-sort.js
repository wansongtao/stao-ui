/**
 * 堆排序，改变原数组
 * @param {any[]} arr 
 * @param {(a, b) => boolean} [compare] 默认升序
 * @returns 
 */
function heapSort(arr, compare = (a, b) => a > b) {
  const heapify = (arr, len) => {
    const count = Math.floor((len - 1) / 2);
    for (let j = count; j >= 0; j--) {
      const left = 2 * j + 1;
      const right = 2 * j + 2;
      let max = j;

      if (left < len && compare(arr[left], arr[max])) {
        max = left;
      }
      if (right < len && compare(arr[right], arr[max])) {
        max = right;
      }

      if (max !== j) {
        [arr[j], arr[max]] = [arr[max], arr[j]];
      }
    }
  };

  const len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    heapify(arr, i + 1);
    [arr[0], arr[i]] = [arr[i], arr[0]];
  }

  return arr;
}
