/**
 * 堆排序，改变原数组
 * @param arr 
 * @param compare 默认升序
 * @returns 
 */
function heapSort<T = number>(arr: T[], compare = (a: T, b: T) => a > b) {
  const heapify = (arr: T[], len: number) => {
    const count = Math.floor((len - 1) / 2);

    for (let i = count; i >= 0; i--) {
      const left = i * 2 + 1;
      const right = i * 2 + 2;
      let extremum = i;

      if (left < len && compare(arr[left], arr[extremum])) {
        extremum = left;
      }
      if (right < len && compare(arr[right], arr[extremum])) {
        extremum = right;
      }

      if (extremum !== i) {
        [arr[i], arr[extremum]] = [arr[extremum], arr[i]];
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
