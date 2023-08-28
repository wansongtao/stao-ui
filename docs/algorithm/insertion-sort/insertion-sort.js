/**
 * 插入排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} [compare] 比较函数，默认升序
 * @returns
 */
function insertionSort(
  arr,
  compare = (a, b) => a > b
) {
  const len = arr.length;

  // 从第二个元素开始，依次插入到前面已排序的数组中
  // 像打扑克牌一样，抽出一张牌插入到已经排好序的牌中
  for (let i = 1; i < len; i++) {
    const temp = arr[i];
    let prev = i - 1;

    // 如果前一个元素比当前元素大，则将前一个元素后移一位
    // 然后当前元素继续往前比较，直到找到比当前元素小的元素
    while (prev >= 0 && compare(arr[prev], temp)) {
      arr[prev + 1] = arr[prev];
      prev--;
    }

    // 1. prev < 0，说明当前元素是最小的，直接插入到数组第一个位置
    // 2. 不满足compare(arr[prev], temp)，说明当前元素比前一个元素
    // 大，直接插入到前一个元素后面
    arr[prev + 1] = temp;
  }

  return arr;
}
