# 特殊方法

## ajax

该方法用于发送ajax请求，支持`Promise`，详细配置请看方法实现。

```ts
import { ajax } from '...'

ajax({
  url: '...',
  method: 'GET',
  params: { id: 1 }
  headers: { ... },
  timeout: 5000,
  responseType: 'json'
}).then(res => {
  console.log(res)
})
```

::: details 方法源码
<<< ../../../../packages/utils/src/special/index.ts#ajax
:::

## fileSlice

该方法用于文件切片，接收一个文件对象、一个开始位置与一个片大小，返回切片好的Blob数组。

```ts
import { fileSlice } from '...'

const file = new File([''], 'test.txt')
const blobs = fileSlice(file, 0, 1024 * 1024)
```

::: details 方法源码
<<< ../../../../packages/utils/src/special/index.ts#fileSlice
:::

## filterEmoji

该方法用于过滤字符串中的emoji表情，接收一个字符串参数，返回过滤后的字符串。

```ts
import { filterEmoji } from '...'

filterEmoji('😂😂😂') // ''
```

::: details 方法源码
<<< ../../../../packages/utils/src/special/index.ts#filterEmoji
:::

## changeCarousel

该方法用于实现轮播图效果，接收一个配置对象，包含以下属性：
- `el`：轮播图容器;
- `index`：下一个显示的元素索引;
- `direction`：轮播方向;
- `duration`：动画持续时间;
- `timingFunc`：动画时间函数;
- `beforeChange`：切换前的回调函数;
- `afterChange`：切换后的回调函数。

```ts
import { changeCarousel } from '...'

changeCarousel({
  el: document.querySelector('.carousel'),
  index: 1,
  direction: 'horizontal',
  duration: 500,
  timingFunc: 'ease',
  beforeChange: () => console.log('before change'),
  afterChange: () => console.log('after change')
})
```

::: details 方法源码
<<< ../../../../packages/utils/src/special/index.ts#changeCarousel
:::

## getMonthMaxDay

该方法用于获取某月的最大天数，接收一个年份与一个月份参数，返回该月最大天数。

```ts
import { getMonthMaxDay } from '...'

getMonthMaxDay(2024, 6) // 30
```

::: details 方法源码
<<< ../../../../packages/utils/src/special/index.ts#getMonthMaxDay
:::

## isLeapYear

该方法用于判断某年是否是闰年，接收一个年份参数，返回一个布尔值。

```ts
import { isLeapYear } from '...'
isLeapYear(2024) // true
```

::: details 方法源码
<<< ../../../../packages/utils/src/special/index.ts#isLeapYear
:::

## getPseudoRandomNumber

该方法用于生成伪随机数，接收一个最小值与一个最大值参数，返回一个在该范围内的随机数。

```ts
import { getPseudoRandomNumber } from '...'
getPseudoRandomNumber(1, 10) // 5
```

::: details 方法源码
<<< ../../../../packages/utils/src/special/index.ts#getPseudoRandomNumber
:::

## fillArray

该方法用于填充数组，接收一个长度与一个填充函数参数，返回填充好的数组。

```ts
import { fillArray, getPseudoRandomNumber } from '...'
fillArray(5, () => 1) // [1, 1, 1, 1, 1]
fillArray(5, () => getPseudoRandomNumber(1, 20)) // [5, 10, 15, 20, 10]
```

::: details 方法源码
<<< ../../../../packages/utils/src/special/index.ts#fillArray
:::
