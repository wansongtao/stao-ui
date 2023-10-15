/**
 * 基数排序，改变原数组
 * @param {number[]} arr 
 * @param {boolean} isAsc 默认升序
 * @returns 
 */
function radixSort(arr, isAsc = true) {
  if (arr.length < 2) return arr;

  let max = Math.max(...arr);
  if (max < 0) {
    max = Math.abs(Math.min(...arr));
  }
  const radix = 10;
  let exp = 1;

  while (max / exp > 0) {
    const buckets = [];
    arr.forEach((item) => {
      let index = Math.floor(Math.abs(item) / exp) % radix;
      if (item < 0) {
        index += radix;
      }
      if (!buckets[index]) {
        buckets[index] = [];
      }
      buckets[index].push(item);
    });

    arr = [];
    buckets.forEach((val, i) => {
      if (!val) return;

      if (isAsc) {
        if (i < 10) {
          arr.push(...val);
          return;
        }

        arr.unshift(...val);
        return;
      }

      if (i < 10) {
        arr.unshift(...val);
        return;
      }

      arr.push(...val);
    });

    exp *= radix;
  }

  return arr;
}
