---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---
# Quick Sort 快速排序

## 1. 算法描述

`快速排序`（Quick Sort）是对冒泡排序的一种改进，是非稳定排序算法。快速排序由 C. A. R. Hoare 在 1962 年提出。它的基本思想是：通过一趟排序将待排序记录分割成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。时间复杂度为 $O(nlogn)$，空间复杂度视实现方法而定。

## 2. 动图演示

![Quick Sort](./quicksort.webp)

## 3. 代码实现

### 3.1 JavaScript 实现

简单实现，不改变原数组，返回新数组。该实现需要额外的空间，但代码简洁明了。

<<< ./quick-sort.js#quickSort

原地排序，改变原数组，不返回新数组。该实现不需要额外的空间，但代码相对复杂。

<<< ./quick-sort.js#quickSortPlus

### 3.2 TypeScript 实现

<<< ./quickSort.ts

## 4. 使用示例

``` js
import quickSort from './quickSort';

const arr = [1, 3, 2, 5, 4];
console.log(quickSort(arr)); // [1, 2, 3, 4, 5]

const arr1 = [{ a: 1 }, { a: 3 }, { a: 2 }, { a: 4 }];
quickSort(arr1, (a, b) => a.a > b.a);
console.log(arr1); // [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
```
