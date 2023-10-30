/**
 * 快速排序，不改变原数组
 * @param arr 
 * @param compare 
 * @returns 
 */
export default function quickSort<T = number>(arr: T[], compare = (a: T, b: T) => a > b): T[] {
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

/**
 * 快速排序，改变原数组
 * @param arr 
 * @param compare 
 * @returns 
 */
export function quickSortPlus<T = number>(arr: T[], compare = (a: T, b: T) => a > b): T[] {
  const quick = (arr: T[], left: number, right: number) => {
    if (left >= right) {
      return;
    }

    const pivot = arr[left];
    let i = left;
    let j = right;
    while( i < j) {
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
