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

## 轮播方法

该方法接受一个对象参数，对象包含以下属性：
1. `options.index`: 需要切换的轮播项索引；
2. `options.ele`: 轮播图容器元素，直接子元素为轮播项；
3. `options.duration`: 可选，切换动画时间，单位ms，默认`500ms`；
4. `options.timingFunc`: 可选，切换动画缓动函数，默认`ease`；
5. `options.direction`: 可选，切换方向，默认`horizontal`，可选`vertical`。
6. `options.beforeChange`: 可选，切换前回调函数，参数当前索引；
7. `options.afterChange`: 可选，切换后回调函数，参数当前索引。

[使用参考](../../components/carousel/index#原生js实现轮播图效果)

::: details 点击查看代码
<<< ../../../packages/utils/src/feature.ts#changeCarousel
:::

## 生成伪随机数

该方法接受两个参数，第一个参数为生成随机数的最小值，第二个参数为生成随机数的最大值。

::: details 点击查看代码
<<< ../../../packages/utils/src/feature.ts#getPseudoRandomNumber
:::

### 使用示例

```ts
import { getPseudoRandomNumber } from '@stao-ui/utils';

getPseudoRandomNumber(1, 10); // 生成1-10之间的随机数
```

## 生成指定长度的数组

该方法接受两个参数，第一个参数为数组长度，第二个参数为一个返回填充值的函数。

::: details 点击查看代码
<<< ../../../packages/utils/src/feature.ts#getArray
:::

### 使用示例

```ts
import { getArray } from '@stao-ui/utils';

getArray(10, () => 1); // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
```

## 获取系统明暗模式

方法返回当前系统模式。接收一个可选函数参数，传入该参数则自动跟随系统模式，函数参数接收一个字符串值，为`dark`时为暗模式，为`light`时为明模式。

::: details 点击查看代码
<<< ../../../packages/utils/src/feature.ts#getSystemTheme
:::

### 使用示例

```ts
import { getSystemTheme } from '@stao-ui/utils';

const currentMode = getSystemTheme((theme) => {
  // 系统模式变化时触发
  console.log(theme); // dark | light
});

console.log(currentMode); // dark | light
```
