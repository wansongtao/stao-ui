/**
 * 桶排序，不改变原数组
 * @param {number[]} arr
 * @param {boolean} [isAsc] 是否升序，默认升序
 * @return {number[]}
 */
function bucketSort(arr, isAsc = true) {
  const len = arr.length;
  if (len < 2) return arr;

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  if (min === max) return arr;

  const bucketSize = Math.ceil((max - min) / 5);
  const buckets = [];
  for (let i = 0; i < len; i++) {
    const index = Math.floor((arr[i] - min) / bucketSize);

    if (buckets[index]) {
      buckets[index].push(arr[i]);
    } else {
      buckets[index] = [arr[i]];
    }
  }

  for (let i = 0; i < buckets.length; i++) {
    if (!buckets[i]) {
      continue;
    }

    buckets[i] = bucketSort(buckets[i], isAsc);
  }

  return buckets.reduce((acc, cur) => {
    if (isAsc) {
      return acc.concat(cur);
    }

    return cur.concat(acc);
  }, []);
}
