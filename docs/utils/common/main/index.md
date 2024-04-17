# 常用函数

::: tip
建议复制源码到自己的项目中使用。
:::  

## 获取数据类型

该函数接收一个参数，返回一个小写字母字符串，表示参数的数据类型。

```ts
import { getDataType } from '@stao-ui/utils';

getDataType(1); // number
getDataType('1'); // string
getDataType(true); // boolean
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#getDataType
:::

## 防抖函数
    
该函数接收三个参数：1. 第一个必选参数为需要防抖处理的函数； 2. 第二个可选参数为延迟时间； 3. 第三个可选参数，支持设置第一次是否立即执行。返回一个防抖函数。  
> 防抖：一定时间内多次触发，如果触发间隔小于设定的时间，则只执行最后触发的一次，可能永远不会执行。

```ts
import { debounce } from '@stao-ui/utils';

const fn = debounce(() => {
  console.log('防抖函数');
}, 1000);

fn();
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#debounce
:::

## 节流函数
  
该函数接收两个参数：1. 第一个必选参数为需要节流处理的函数； 2. 第二个可选参数为延迟时间。返回一个节流函数。
> 节流：触发一次后，下次触发需要间隔一定的时间。

```ts
import { throttle } from '@stao-ui/utils';

const fn = throttle(() => {
  console.log('节流函数');
}, 1000);

fn();
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#throttle
:::

## 日期时间格式化

该函数接收两个参数：1. 第一个可选参数为Date对象，默认当前时间； 2. 第二个可选参数为格式化字符串模板，默认‘yyyy/MM/dd HH:mm:ss’。返回一个格式化后的时间字符串。

```ts
import { formatTime } from '@stao-ui/utils';

const date = new Date('2023/08/04 13:52:31');

formatTime(date, 'yyyy-MM-dd hh:mm:ss'); // 2023-08-04 01:52:31
formatTime(date, 'yy-M-d h:mm:ss'); // 23-8-4 1:52:31
formatTime(date, 'HH:mm:ss'); // 13:52:31
formatTime(date, 'h:mm:ss'); // 1:52:31
formatTime(date, 'yyyy年M月d日 H时m分'); // 2023年8月4日 13时52分
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#formatTime
:::

## 深拷贝

该函数接收一个对象类型参数，返回一个深拷贝的对象。支持拷贝简单数据类型、Object、Array、Map、Set、Date、RegExp、Function、循环引用。

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

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#deepClone
:::

## 网页空闲检测

该函数接收三个参数：1. 第一个必选参数为需要执行的函数； 2. 第二个可选参数为延迟时间； 3. 第三个可选参数为是否立即开始。返回三个函数，分别是开始检测函数、停止检测函数、重新开始检测函数。

```ts
import { idleDetection } from '@stao-ui/utils';

const fn = idleDetection(() => {
  // 网页5s无操作后执行
}, 5000);

fn();
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#idleDetection
:::

## 文件切片函数

该函数接收三个参数：1. 第一个必选参数为文件对象； 2. 第二个可选参数为开始切片位置，默认0； 3. 第三个可选参数为切片大小，默认1024 * 512。返回一个切片后的文件对象数组。

```ts
import { fileSlice } from '@stao-ui/utils';

const files = fileSlice(file, 0, 1024 * 512);
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#fileSlice
:::

## 预加载图片

该函数接收一个图片地址数组，返回一个 Promise 对象。当所有图片加载成功时，resolve，否则 reject。

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

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#preloadImages
:::

## 时区转换

该函数接收三个参数：1. 第一个必选参数为Date对象或可以转换为Date对象的值； 2. 第二个可选参数为转换后的时区； 3. 第三个可选参数为当前时区。返回一个转换后的 Date 对象。

```ts
import { convertTimeZone } from '@stao-ui/utils';

const date = new Date();
convertTimeZone(date, 9); // 东八区时间转换为东九区时间
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#convertTimeZone
:::

## Ajax

封装`XMLHttpRequest`对象，添加对`promise`的支持，提供良好的类型提示。具体参数请查看源码。

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

::: details 查看源码(TS版)
<<< ../../../../packages/utils/src/utils.ts#ajax
:::

::: details 查看源码(JS版)
<<< ./ajax.js
:::

## 函数式编程实现

传入一系列函数，返回一个函数，依次执行传入的函数，前一个函数的返回值为后一个函数的入参。

```ts
import { compose } from '@stao-ui/utils';

const fn = compose(
  (a: number) => a + 1,
  (a: number) => a + 2,
  (a: number) => a + 3
);

fn(1); // 7
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#compose
:::

## 柯里化函数

该函数接收一个函数，返回一个柯里化后的函数。可以传入多个参数，当参数数量满足函数参数数量时，执行函数。

```ts
import { curry } from '@stao-ui/utils';

const fn = curry((a: number, b: number, c: number) => {
  return a + b + c;
});

fn(1, 2, 3); // 6
fn(1)(2)(3); // 6
fn(1, 2)(3); // 6
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#curry
:::

## a 标签下载文件

该函数接收两个参数：1. 第一个必选参数为下载地址； 2. 第二个可选参数为文件名。

```ts
import { downloadFileToLocale } from '@stao-ui/utils';

downloadFileToLocale('url', '图片.jpeg');
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#downloadFileToLocale
:::

## 对象转查询字符串

该函数接收两个参数：1. 第一个必选参数为对象； 2. 第二个可选参数为是否使用`encodeURIComponent`编码。

```ts
import { getQueryString } from '@stao-ui/utils';

getQueryString({a: 'test', b: 'hello'}, false); // ?a=test&b=hello
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#getQueryString
:::

## 过滤 emoji 表情

该函数接收一个字符串参数，返回一个过滤后的字符串。

```ts
import { filterEmoji } from '@stao-ui/utils';

filterEmoji('😀😁😂🤣😃😄😅😆😉😊'); // ''
```

::: details 查看源码
<<< ../../../../packages/utils/src/utils.ts#filterEmoji
:::

## 系统判断

判断是否为iPhone/iPad。

```js
/**
 * @description 判断是否为iPhone/iPad
 * @returns {Boolean}
 */
const isIos = () => {
  const { userAgent } = navigator;

  return userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1;
};
```

判断是否为手机打开(含iPad)。

```js
/**
 * @description 判断是否为手机打开(含iPad)
 * @returns {Boolean}
 */
const isMobile = () => {
  const clientTexts = ['iPhone', 'iPad', 'Android', 'Mobile'];
  const { userAgent } = navigator;

  return clientTexts.some((item) => userAgent.indexOf(item) > -1);
};
```
