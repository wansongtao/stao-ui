// #region quickSort
/**
 * 快速排序，不改变原数组
 * @param {any[]} arr
 * @param {(a: number, b: number) => boolean} compare
 * @returns {any[]}
 */
function quickSort(arr, compare = (a, b) => a > b) {
  if (arr.length < 2) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (compare(arr[i], pivot)) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }

  return [...quickSort(left, compare), pivot, ...quickSort(right, compare)];
}
// #endregion quickSort

// #region quickSortPlus
/**
 * 快速排序，改变原数组，空间复杂度更优
 * @param {any[]} arr 
 * @param {(a: number, b: number) => boolean} compare 
 * @returns {any[]}
 */
function quickSortPlus(arr, compare = (a, b) => a > b) {
  const quick = (arr, left, right) => {
    if (left >= right) return;

    const pivot = arr[left];
    let i = left;
    let j = right;

    // 一次排序，将比 pivot 小的放在一边，比 pivot 大的放在另一边
    while (i < j) {
      while (i < j && compare(arr[j], pivot)) {
        j--;
      }
      arr[i] = arr[j];

      while (i < j && compare(pivot, arr[i])) {
        i++;
      }
      arr[j] = arr[i];
    }

    arr[i] = pivot;
    quick(arr, left, i - 1);
    quick(arr, i + 1, right);
  };

  quick(arr, 0, arr.length - 1);
  return arr;
}
// #endregion quickSortPlus
