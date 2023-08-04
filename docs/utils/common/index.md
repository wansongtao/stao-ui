# 常用方法

## 获取数据类型

传入任意数据，返回数据类型，小写形式。

```ts
import { getDataType } from '@stao-ui/utils';

getDataType(1); // number
getDataType('1'); // string
getDataType(true); // boolean
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#getDataType
:::

## 格式化时间

传入一个 Date，返回一个格式化后的时间字符串。支持设置格式化模板。

```ts
import { formatTime } from '@stao-ui/utils';

const date = new Date('2023/08/04 13:52:31');

formatTime(date, 'yyyy-MM-dd hh:mm:ss'); // 2023-08-04 01:52:31
formatTime(date, 'yy-M-d h:mm:ss'); // 23-8-4 1:52:31
formatTime(date, 'HH:mm:ss'); // 13:52:31
formatTime(date, 'h:mm:ss'); // 1:52:31
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#formatTime
:::

## 节流函数

传入一个函数，返回一个节流函数。触发一次后，一定时间内不会再次触发。

```ts
import { throttle } from '@stao-ui/utils';

const fn = throttle(() => {
  console.log('节流函数');
}, 1000);

fn();
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#throttle
:::

## 防抖函数

传入一个函数，返回一个防抖函数。触发一次后，一定时间内再次触发会重新计时。可以设置第一次立即触发。

```ts
import { debounce } from '@stao-ui/utils';

const fn = debounce(() => {
  console.log('防抖函数');
}, 1000);

fn();
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#debounce
:::

## 函数式编程实现

传入一系列函数，返回一个函数，依次执行传入的函数。

```ts
import { compose } from '@stao-ui/utils';

const fn = compose(
  (a: number) => a + 1,
  (a: number) => a + 2,
  (a: number) => a + 3
);

fn(1); // 7
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#compose
:::

## 柯里化函数

传入一个函数，返回一个柯里化函数。可以传入多个参数，当参数数量满足函数参数数量时，执行函数。

```ts
import { curry } from '@stao-ui/utils';

const fn = curry((a: number, b: number, c: number) => {
  return a + b + c;
});

fn(1, 2, 3); // 6
fn(1)(2)(3); // 6
fn(1, 2)(3); // 6
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#curry
:::

## 深拷贝

传入一个对象，返回一个深拷贝的对象。支持拷贝简单数据类型、Object、Array、Map、Set、Date、RegExp、Function、BigInt、循环引用。

```ts
import { deepClone } from '@stao-ui/utils';

const obj = {
  a: 1,
  b: {
    c: 2
  }
};

const cloneObj = deepClone(obj); // { a: 1, b: { c: 2 } }
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#deepClone
:::

## 文件切片函数

传入一个文件，返回一个切片后的文件数组。支持设置开始切片位置与切片大小。

```ts
import { fileSlice } from '@stao-ui/utils';

const files = fileSlice(file, undefined, 1024 * 512);
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#fileSlice
:::

## 希尔排序

传入一个数组，返回一个排序后的数组，改变原数组。支持设置排序规则。

```ts
import { shellSort } from '@stao-ui/utils';

const arr = [{ a: 100 }, { a: 10 }, { a: 20 }];
shellSort(arr, (a, b) => a.a - b.a > 0); // [{ a: 100 }, { a: 20 }, { a: 10 }]
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#shellSort
:::

## 预加载图片

传入一个图片地址列表，返回一个 Promise 对象。支持设置图片加载成功与失败的回调，全部加载成功才会执行成功回调，只要有一个加载失败就会执行失败回调并抛出失败的图片 url。

```ts
import { preloadImages } from '@stao-ui/utils';

const imgs = [
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
];

preloadImages(imgs)
  .then(() => {
    console.log('图片加载成功');
  })
  .catch((url) => {
    console.log('图片加载失败', url);
  });
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#preloadImages
:::

## 时区转换

传入一个时间，返回一个转换后的 Date。支持设置转换后的时区与待转换时间时区。

```ts
import { convertTimeZone } from '@stao-ui/utils';

const date = new Date();
convertTimeZone(date, 9); // 东八区时间转换为东九区时间
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#convertTimeZone
:::

## 润平年判断

传入一个年份，返回一个布尔值。

```ts
import { isLeapYear } from '@stao-ui/utils';

isLeapYear(2012); // true
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#isLeapYear
:::

## a 标签下载文件

支持设置文件地址与文件名。

```ts
import { downloadFileToLocale } from '@stao-ui/utils';

downloadFileToLocale('url', '图片.jpeg');
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#downloadFileToLocale
:::

## 过滤 emoji 表情

传入一个字符串，返回一个过滤后的字符串。

```ts
import { filterEmoji } from '@stao-ui/utils';

filterEmoji('😀😁😂🤣😃😄😅😆😉😊'); // ''
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#filterEmoji
:::

## 获取文件的 MIME 类型

传入文件名，返回一个 MIME 类型字符串。

```ts
import { getMimeTypeByFileName } from '@stao-ui/utils';

getMimeTypeByFileName('fileName.jpeg'); // image/jpeg
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#getMimeTypeByFileName
:::

## 文件是否可以在浏览器打开

传入文件 MIME 类型，返回一个布尔值。

```ts
import { canOpenInBrowser } from '@stao-ui/utils';

canOpenInBrowser('fileName.jpeg'); // true
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#canOpenInBrowser
:::

## 获取一个月的最大天数

传入年份与月份，返回一个数字。

```ts
import { getMaxDayOfMonth } from '@stao-ui/utils';

getMaxDayOfMonth(2023, 2); // 28
```

::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#getMaxDayOfMonth
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
<<< ../../../packages/utils/utils.ts#aliOssImageResize
:::
