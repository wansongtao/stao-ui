<script setup>
import nativeExample from './nativeExample.vue'
import simpleExample from './simpleExample.vue'
</script>
# 轮播图组件

::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::  

## 原生js实现轮播图效果

使用原生js、html、css实现的轮播图组件，不依赖任何第三方库。如需使用，只需分别复制js、html、css代码插入您项目文件的对应位置即可。

<nativeExample />

::: details 水平轮播源代码
<<< ./index.html
:::

::: details 垂直轮播源代码
<<< ./vertical.html
:::

## 轮播组件-vue3版

封装的vue3轮播图组件，使用vue3、typescript、scss实现，不依赖任何第三方库。  
***使用场景：需要高度自定义的carousel组件时，或其他组件库不能满足需求的时候。***
::: details SCarousel 源代码
<<< ../../../packages/components/src/SCarousel/index.vue
:::

::: details changeCarousel 源代码
<<< ../../../packages/utils/src/feature.ts#changeCarousel
:::

::: details SCarouselItem 源代码
<<< ../../../packages/components/src/SCarouselItem/index.vue
:::

### 基础用法
自动轮播，点击指示器切换轮播图，鼠标移入显示左右箭头，点击箭头切换轮播图。

<simpleExample />

::: details 查看示例代码
<<< ./simpleExample.vue
:::

## API

### SCarousel Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoPlay | 是否自动轮播 | _boolean_ | `false` |
| arrow | 箭头显示时机 | _'always' \| 'hover' \| 'never'_ | `hover` |
| direction | 轮播方向 | _'horizontal' \| 'vertical'_ | `horizontal` |
| defaultIndex | 默认开始索引 | _number_ | `0` |
| dotPosition | 指示器位置 | _'top' \| 'bottom' \| 'left' \| 'right'_ | `bottom` |
| duration | 切换动画时间，单位ms | _number_ | `500` |
| easing | 切换动画函数 | _string_ | `ease` |
| interval | 自动轮播间隔，单位ms | _number_ | `3000` |
| loop | 是否循环显示 | _boolean_ | `true` |
| showDot | 是否显示指示器 | _boolean_ | `true` |
| beforeChange | 切换前的回调函数 | _(from: number, to: number) => void_ | - |
| afterChange | 切换后的回调函数 | _(current: number) => void_ | - |

### Tabs Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- | 
| onGoTo | 切换到指定项 | `(index: number) => void` | 
| onPrev | 切换到前一项 | `() => void` | 
| onNext | 切换到后一项 | `() => void` | 

### SCarousel Slots

| 名称 | 说明 | 参数 | 默认值 |
| --- | --- | --- | --- | 
| default | 默认插槽，轮播内容 | - | - | 
| dot | 自定义指示器 | `{ active, index }` | - |
| arrowLeft | 自定义左箭头 | - | - |
| arrowRight | 自定义右箭头 | - | - |
