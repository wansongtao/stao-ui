# 常用方法

## getDataType

该方法用于获取参数数据类型，接收一个任意类型的参数，返回该参数的数据类型，小写字母形式。

```ts
import { getDataType } from '...'

getDataType('') // string
getDataType(1) // number
getDataType(true) // boolean
getDataType([]) // array
getDataType({}) // object
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#getDataType
:::

## debounce

该方法用于事件防抖，接收一个函数、一个延迟时间和一个是否立即执行一次的布尔值，返回一个新函数，新函数在延迟时间内多次调用时，只会执行最后一次调用。

```ts
import { debounce } from '...'

const fn = debounce(() => console.log('debounce'), 1000)
fn()
fn() // 1秒后输出 debounce
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#debounce
:::

## throttle

该方法用于事件节流，接收一个函数和一个延迟时间，返回一个新函数，新函数在延迟时间内多次调用时，只会执行第一次调用。

```ts
import { throttle } from '...'

const fn = throttle(() => console.log('throttle'), 1000)
fn() // 立即输出 throttle
fn() // 间隔时间小于1s，不会执行
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#throttle
:::

## curry

柯理化方法，该方法接收一个函数，返回一个新函数，新函数接收的参数数量不足时，会返回一个新函数，直到参数数量足够执行原函数。

```ts
import { curry } from '...'

const add = curry((a: number, b: number, c: number) => a + b + c)
add(1)(2)(3) // 6
add(1, 2)(3) // 6
add(1)(2, 3) // 6
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#curry
:::

## compose

组合方法，多用于函数式编程，接收多个函数，返回一个新函数，新函数会将参数依次传入每个函数，并将结果传入下一个函数。

```ts
import { compose } from '...'

const fn = compose(
  (a: number) => a + 1,
  (a: number) => a * 2
)
fn(1) // 3
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#compose
:::

## deepClone

深拷贝方法，接收一个对象，返回该对象的深拷贝，支持Map、Set、RegExp、Date、Function类型、循环引用与简单数据类型。

```ts
import { deepClone } from '...'

const obj = { a: 1, b: { c: 2 } }
const clone = deepClone(obj)
obj === clone // false
obj.b === clone.b // false
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#deepClone
:::

## getQueryString

该方法接收一个对象与一个是否编码的布尔值，返回一个拼接的查询字符串。

```ts
import { getQueryString } from '...'

getQueryString({ a: 1, b: 2, c: null }) // ?a=1&b=2
getQueryString({ a: 1, b: 2, c: '哈哈' }) // ?a=1&b=2&c=%E5%93%88%E5%93%88
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#getQueryString
:::

## formatTime

该方法接收一个`Date`对象与一个格式字符串，返回格式化时间字符串。格式字符串，默认：yyyy/MM/dd HH:mm:ss。yy: 输出两位数的年份，
h：输出12小时制，H：输出24小时制，M：月份，m：分钟，一位字母则不补零。

```ts
import { formatTime } from '...'

formatTime() // 2024/06/01 12:56:55
formatTime(undefined, 'yy-M-d H:mm:ss') // 24-6-1 12:59:12
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#formatTime
:::

## idleDetection

网页空闲监测方法，接收一个回调函数与一个空闲时间，返回一个`IdleDetection`对象，该对象有`startDetection`、`stopDetection`、`restartDetection`方法。

```ts
import { idleDetection } from '...'

const idle = idleDetection(() => console.log('idle'), 1000)
idle.startDetection() // 用户空闲1秒后输出 idle
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#idleDetection
:::

## deepFindItem

深度查找树形结构中的某个节点，接收一个数组对象、一个查找函数与一个子元素键名，返回查找到的第一个节点。

```ts
import { deepFindItem } from '...'

const arr = [{ a: 1, children: [{ a: 2 }] }]
deepFindItem(arr, (item) => item.a === 2, 'children') // { a: 2 }
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#deepFindItem
:::

## deepMap

深度遍历树形结构，接收一个数组对象、一个映射函数与一个子元素键名，返回一个新的数组对象。映射函数接收一个参数：当前节点。

```ts
import { deepMap } from '...'

const arr = [{ a: 1, b: 2, children: [{ a: 2, b: 4 }]}]
const newArr = deepMap(arr, (v) => {
  return {
    a: v.a * 2,
    b: v.b * 2,
    children: v.children
  }
}) // result: [{ a: 2, b: 4, children: [{ a: 4, b: 8 }]}]
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#deepMap
:::

## deepForeach

树结构的广度优先遍历，接收一个数组对象、一个遍历函数与一个子元素键名。遍历函数接收一个参数：当前节点。

```ts
import { deepForeach } from '...'

const arr = [{ a: 1, b: 2, children: [{ a: 2, b: 4 }]}]
deepForeach(arr, (v) => {
  console.log(v) // { a: 1, b: 2, children: [...] } => { a: 2, b: 4 }
})
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#deepForeach
:::

## getSystemTheme

该方法用于获取系统主题，返回字符串`light`或`dark`。

```ts
import { getSystemTheme } from '...'
const theme = getSystemTheme()
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#getSystemTheme
:::

## followSystemTheme

该方法用于自动跟随系统主题，接收一个回调函数参数。系统主题变化时，调用回调并传入当前主题。

```ts
import { followSystemTheme } from '...'
const theme = followSystemTheme((theme) => {
  console.log(theme) // 'light' / 'dark'
})
```

::: details 方法源码
<<< ../../../../packages/utils/src/common/index.ts#followSystemTheme
:::
