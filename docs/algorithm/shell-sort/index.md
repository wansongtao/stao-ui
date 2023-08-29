---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---
# Shell Sort 希尔排序

## 1. 算法描述

`希尔排序`（Shell Sort）是插入排序的一种更高效的改进版本，也称为缩小增量排序，是非稳定排序算法。希尔排序通过将比较的全部元素分为几个区域来提升插入排序的性能。这样可以让一个元素可以一次性地朝最终位置前进一大步。然后算法再取越来越小的步长进行排序，算法的最后一步就是普通的插入排序，但是到了这步，需排序的数据几乎是已排好的了（此时插入排序较快）。时间复杂度为 $O(nlog^2n)$，空间复杂度为 $O(1)$。

## 2. 动图演示

![Shell Sort](./shellsort.webp)

## 3. 代码实现

### 3.1 JavaScript 实现

<<< ./shell-sort.js

### 3.2 TypeScript 实现

<<< ./shellSort.ts

## 4. 使用示例

``` js
import shellSort from './shellSort';

const arr = [1, 3, 2, 5, 4];
console.log(shellSort(arr)); // [1, 2, 3, 4, 5]

const arr1 = [{ a: 1 }, { a: 3 }, { a: 2 }, { a: 4 }];
shellSort(arr1, (a, b) => a.a > b.a);
console.log(arr1); // [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
```
