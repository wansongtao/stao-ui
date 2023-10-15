---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---
# Bucket Sort 桶排序

## 1. 算法描述

`桶排序`（Bucket Sort）是一种非基于比较的排序算法，它的基本思想是：将要排序的数据分到几个有序的桶里，每个桶里的数据再单独进行排序（可能继续使用桶排序）。桶内排完序之后，再把每个桶里的数据按照顺序依次取出，组成的序列就是有序的了。时间复杂度为 $O(n+k)$，空间复杂度为 $O(n+k)$，其中 $k$ 是桶的数量。

## 2. 动图演示

![Bucket Sort](./bucketsort.gif)

## 3. 代码实现

### 3.1 JavaScript 实现

<<< ./bucket-sort.js

### 3.2 TypeScript 实现

<<< ./bucketSort.ts

## 4. 使用示例

``` js
import bucketSort from './bucketSort';

const arr = [1, 3, 2, 5, 4];
console.log(bucketSort(arr)); // [1, 2, 3, 4, 5]
```
