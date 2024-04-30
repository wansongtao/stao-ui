# 冷门函数

::: tip
建议复制源码到自己的项目中使用。
:::  

## 希尔排序

该函数接收两个参数，第一个参数为需要排序的数组，第二个参数为一个比较函数。返回一个排序后的数组，改变原数组。
> 希尔排序是插入排序的一种更高效的改进版本，它的基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。[查看更多](../../../algorithm/shell-sort/index)。

```ts
import { shellSort } from '@stao-ui/utils';

const arr = [{ a: 100 }, { a: 10 }, { a: 20 }];
shellSort(arr, (a, b) => a.a - b.a > 0); // [{ a: 100 }, { a: 20 }, { a: 10 }]
```

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#shellSort
:::

## 判断是否为素数（质数）

该函数接收一个数字参数，返回一个布尔值。

```ts
import { isPrime } from '@stao-ui/utils';

isPrime(2); // true
isPrime(4); // false
```

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#isPrime
:::

## 润平年判断

该函数接收一个年份参数，返回一个布尔值。

```ts
import { isLeapYear } from '@stao-ui/utils';

isLeapYear(2012); // true
```

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#isLeapYear
:::

## 获取项目 git tag 版本号

通过 shelljs 获取项目的 git 信息，进而获取 tag 版本信息。  
**使用场景：配合 vite 的环境变量设置网站版本号。**

```ts
import version from './version'
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  define: {
    __APP_VERSION__: JSON.stringify(version)
  }
})
```

::: details 查看源码
<<< ../../../../packages/utils/src/version.ts
:::

## 轮播方法

该函数接受一个配置对象，该对象包含以下属性：
1. `options.index`: 需要切换的轮播项索引；
2. `options.ele`: 轮播图容器元素，直接子元素为轮播项；
3. `options.duration`: 可选，切换动画时间，单位ms，默认`500ms`；
4. `options.timingFunc`: 可选，切换动画缓动函数，默认`ease`；
5. `options.direction`: 可选，切换方向，默认`horizontal`，可选`vertical`。
6. `options.beforeChange`: 可选，切换前回调函数，参数当前索引；
7. `options.afterChange`: 可选，切换后回调函数，参数当前索引。

使用示例请[参考](../../../components/carousel/index#原生js实现轮播图效果)组件里的轮播图组件实现。

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#changeCarousel
:::

## 生成伪随机数

该函数接受两个参数，第一个参数为生成随机数的最小值，第二个参数为生成随机数的最大值。返回一个随机数字。

```ts
import { getPseudoRandomNumber } from '@stao-ui/utils';

getPseudoRandomNumber(1, 10); // 生成1-10之间的随机数
```

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#getPseudoRandomNumber
:::

## 生成指定长度的数组

该函数接受两个参数，第一个参数为数组长度，第二个参数为数组填充值。返回一个填充后的数组。

```ts
import { createArray } from '@stao-ui/utils';

createArray(6, 1); // [1, 1, 1, 1, 1, 1]
```

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#createArray
:::

## 获取系统主题

该函数接受一个可选的回调函数，当系统模式变化时触发回调函数，返回当前系统模式。

```ts
import { getSystemTheme } from '@stao-ui/utils';

const currentMode = getSystemTheme((theme) => {
  // 系统模式变化时触发
  console.log(theme); // dark | light
});

console.log(currentMode); // dark | light
```

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#getSystemTheme
:::

## 获取文件的 MIME 类型

该函数接受一个文件名参数，返回一个 MIME 类型。

```ts
import { getMimeType } from '@stao-ui/utils';

getMimeType('fileName.jpeg'); // image/jpeg
```

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#getMimeType
:::

## 文件是否可以在浏览器打开

该函数接受一个文件类型参数，返回一个布尔值。

```ts
import { canOpenInBrowser } from '@stao-ui/utils';

canOpenInBrowser('image/jpeg'); // true
```

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#canOpenInBrowser
:::

## 获取一个月的最大天数

该函数接受两个参数，第一个参数为年份，第二个参数为月份。返回这个月的最大天数。

```ts
import { getMaxDayOfMonth } from '@stao-ui/utils';

getMaxDayOfMonth(2023, 2); // 28
```

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#getMaxDayOfMonth
:::

## 前端直传文件到阿里云 OSS

使用 axios 封装，支持进度回调。具体参数请查看以下代码。

::: details 查看源码
<<< ../../../../packages/utils/src/api/upload.ts
:::

## 阿里云图片缩放

该函数接收两个参数，第一个参数为图片地址，第二个参数为一个配置对象，具体配置请查看源码。

```ts
import { aliOssImageResize } from '@stao-ui/utils';

aliOssImageResize('oss url', {
  m: 'fill',
  w: 100,
  h: 100,
  color: 'fff'
});
```

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#aliOssImageResize
:::

## html2canvas 封装

该函数接收两个参数，第一个参数为一个 DOM 元素，第二个参数为配置对象。返回一个 Promise 对象。

::: details 查看源码
<<< ../../../../packages/utils/src/html2canvas.js
:::

## 深度查找

该函数接收三个参数，第一个参数为一个数组对象，第二个参数为一个比较函数，第三个参数为一个设置子元素key的字符串。返回查找到的项。

```ts
import { deepFind } from '@stao-ui/utils';

const obj = [
  { a: 1, b: 10, children: [{ a: 20, b: 11 }]},
  { a: 2, b: 11 },
  { a: 3, b: 12 },
  { a: 4, b: 13 },
];

deepFind(obj, (v) => v === 20, 'children'); // {a: 20, b: 11}
```

::: details 查看源码
<<< ../../../../packages/utils/src/feature.ts#deepFind
:::
