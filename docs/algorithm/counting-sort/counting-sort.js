/**
 * 计数排序，适用于整数排序，不改变原数组
 * @param {number[]} arr 
 * @param {boolean} [isAsc] 是否升序，默认为 true 
 * @returns 
 */
function countingSort(arr, isAsc = true) {
  const counts = [];
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    const idx = Math.abs(value);
    if (counts[idx] === undefined) {
      counts[idx] = { positive: 0, negative: 0 };
    }

    value < 0 ? counts[idx].negative++ : counts[idx].positive++;
  }

  const results = [];
  for (let i = 0; i < counts.length; i++) {
    if (!counts[i]) {
      continue;
    }

    for (let j = 0; j < counts[i].positive; j++) {
      if (isAsc) {
        results.push(i);
        continue;
      }
      results.unshift(i);
    }

    for (let j = 0; j < counts[i].negative; j++) {
      if (isAsc) {
        results.unshift(-i);
        continue;
      }
      results.push(-i);
    }
  }

  return results;
}
