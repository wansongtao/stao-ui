---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---
# Radix Sort 基数排序

## 1. 算法描述

`基数排序`（Radix Sort）是一种非基于比较的排序算法，它的基本思想是：将整数按位数切割成不同的数字，然后按每个位数分别比较。时间复杂度为 $O(n*k)$，空间复杂度为 $O(n+k)$，其中 $k$ 是整数的最大位数。

## 2. 动图演示

![Radix Sort](./radixsort.gif)

## 3. 代码实现

### 3.1 JavaScript 实现

<<< ./radix-sort.js

### 3.2 TypeScript 实现

<<< ./radixSort.ts

## 4. 使用示例

``` js
import radixSort from './radixSort';

const arr = [1, 3, 2, 5, 4];
console.log(radixSort(arr)); // [1, 2, 3, 4, 5]
```
