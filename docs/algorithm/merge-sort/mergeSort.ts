/**
 * 归并排序，不改变原数组
 * @param arr
 * @param compare 比较函数，默认升序
 * @returns
 */
export default function mergeSort<T = unknown>(
  arr: T[],
  compare: (a: T, b: T) => boolean = (a, b) => a > b
): T[] {
  const len = arr.length;
  if (len < 2) return arr;
  const mid = Math.floor(len / 2);
  const left = mergeSort(arr.slice(0, mid), compare);
  const right = mergeSort(arr.slice(mid), compare);

  const result = [];
  const leftLen = left.length;
  const rightLen = right.length;
  let i = 0,
    j = 0;
  do {
    if (compare(right[j], left[i])) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  } while (i < leftLen && j < rightLen);

  return result.concat(i < leftLen ? left.slice(i) : right.slice(j));
}
