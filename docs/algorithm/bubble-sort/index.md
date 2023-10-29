---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---
# Bubble Sort 冒泡排序

## 1. 算法描述

`冒泡排序`（Bubble Sort）是一种简单的、稳定的排序算法。它重复地遍历要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。遍历数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。时间复杂度 $O(n^2)$，空间复杂度 $O(1)$。

## 2. 动图演示

![bubble.gif](./bubblesort.webp)

## 3. 算法实现

### 3.1 JavaScript 实现

<<< ./bubble-sort.js

### 3.2 TypeScript 实现

<<< ./bubbleSort.ts

## 4. 使用示例

``` js
import bubbleSort from './bubbleSort';

const arr1 = [3, 5, 1, 4, 2];
bubbleSort(arr1);
console.log(arr1); // [1, 2, 3, 4, 5]

const arr2 = [{a: 1}, {a: 10}, {a: 10}, {a: 4}, {a: 0}];
bubbleSort(arr2, (a, b) => a.a > b.a);
console.log(arr2); // [{a: 0}, {a: 1}, {a: 4}, {a: 10}, {a: 10}]
```

## 5. 速度测试

::: tip
数组长度过大，网页可能会崩溃哦，请量力而行！
:::
<script setup>
import SortExample from './sort.vue'
</script>

<SortExample />
