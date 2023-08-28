---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---
# Selection Sort 选择排序

## 1. 算法描述

`选择排序`（Selection Sort）是一种简单直观的、不稳定的原址比较排序算法。大致思路是找到数据结构中的最小(大)值并将其放置在第一位，接着找到第二小(大)的值并将其放在第二位，以此类推。时间复杂度为 $O(n^2)$，空间复杂度为 $O(1)$。

## 2. 动图演示

![Selection Sort](./selectionsort.webp)

## 3. 代码实现

### 3.1 JavaScript 实现

<<< ./selection-sort.js

### 3.2 TypeScript 实现

<<< ./selectionSort.ts

## 4. 使用示例

``` js
import selectionSort from './selectionSort';

const arr = [1, 3, 2, 5, 4];
console.log(selectionSort(arr)); // [1, 2, 3, 4, 5]

const arr1 = [{ a: 1 }, { a: 3 }, { a: 2 }, { a: 4 }];
selectionSort(arr1, (a, b) => a.a > b.a);
console.log(arr1); // [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
```

