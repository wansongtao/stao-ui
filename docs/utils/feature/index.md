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

## html2canvas 封装

使用 Promise 封装 html2canvas，返回图片 url。

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

## 前端直传文件到阿里云 OSS

使用 axios 封装，支持进度回调。具体参数请查看以下代码。

::: details 点击查看代码
<<< ../../../packages/utils/src/api/upload.ts
:::

## 获取项目 tag 版本号

通过 shelljs 获取项目的 git 信息，进而获取 tag 版本信息。  
**_使用场景：配合 vite 的环境变量设置网站版本号。_**

::: details 点击查看代码
<<< ../../../packages/utils/src/version.ts
:::

## Ajax, 封装 XMLHttpRequest

封装 XMLHttpRequest，支持进度回调等。具体参数请查看以下代码。

::: details 点击查看代码
<<< ../../../packages/utils/src/feature.ts#ajax
:::

### 使用示例

```ts
import { ajax } from '@stao-ui/utils';

ajax({
  url: 'url',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    a: 1
  }
}).then((res) => {
  const { data, xhr } = res;
  console.log(data, xhr);
});
```
