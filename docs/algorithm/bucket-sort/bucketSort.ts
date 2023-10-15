/**
 * 桶排序，不改变原数组
 * @param arr 
 * @param isAsc 默认升序
 * @returns 
 */
function bucketSort(arr: number[], isAsc = true) {
  const len = arr.length;
  if (len < 2) return arr;

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  if (min === max) return arr;

  const bucketSize = Math.ceil((max - min) / 5);
  const buckets: number[][] = [];
  for (let i = 0; i < len; i++) {
    const index = Math.floor((arr[i] - min) / bucketSize);
    if (!buckets[index]) {
      buckets[index] = [];
    }
    buckets[index].push(arr[i]);
  }

  const result: number[] = [];
  for (let i = 0; i < buckets.length; i++) {
    if (!buckets[i]) {
      continue;
    }

    const sorts = bucketSort(buckets[i], isAsc);
    isAsc ? result.push(...sorts) : result.unshift(...sorts);
  }

  return result;
}
