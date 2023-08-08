# 特殊方法

## 希尔排序

传入一个数组，返回一个排序后的数组，改变原数组。支持设置排序规则。

```ts
import { shellSort } from '@stao-ui/utils';

const arr = [{ a: 100 }, { a: 10 }, { a: 20 }];
shellSort(arr, (a, b) => a.a - b.a > 0); // [{ a: 100 }, { a: 20 }, { a: 10 }]
```

::: details 点击查看代码
<<< ../../../packages/utils/src/feature.ts#shellSort
:::

## 阿里云图片缩放

传入图片地址与缩放参数，返回一个缩放后的图片地址。

```ts
import { aliOssImageResize } from '@stao-ui/utils';

aliOssImageResize('oss url', {
  m: 'fill',
  w: 100,
  h: 100,
  color: 'fff'
});
```
::: details 点击查看代码
<<< ../../../packages/utils/src/feature.ts#aliOssImageResize
:::

## html2canvas封装
使用Promise封装html2canvas，返回图片url。

::: details 点击查看代码
<<< ../../../packages/utils/src/html2canvas.js
:::

## 判断是否为素数（质数）

传入一个数字，返回一个布尔值。

```ts
import { isPrime } from '@stao-ui/utils';

isPrime(2); // true
isPrime(4); // false
```

::: details 点击查看代码
<<< ../../../packages/utils/src/feature.ts#isPrime
:::

## 前端直传文件到阿里云OSS

使用axios封装，支持进度回调。具体参数请查看以下代码。

::: details 点击查看代码
<<< ../../../packages/utils/src/api/upload.ts
:::
