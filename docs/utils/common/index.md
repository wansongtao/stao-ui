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
  (a: number) => a + 3,
);

fn(1); // 7
```
::: details 点击查看代码
<<< ../../../packages/utils/utils.ts#compose
:::


