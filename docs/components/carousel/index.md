# Carousel 走马灯

轮播组件，用于循环播放一组图片或卡片。

::: details Carousel 源码
<<< ../../../packages/components/src/SCarousel/index.vue
:::
::: details CarouselItem 源码
<<< ../../../packages/components/src/SCarouselItem/index.vue
:::

## 基本用法

<script lang="ts" setup>
import ExampleView from './ExampleView.vue'
</script>

<ExampleView />

::: details 示例代码
<<< ./ExampleView.vue
:::

## API

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 轮播方向 | _'horizontal' \| 'vertical'_ | `horizontal` |
| autoPlay | 是否自动轮播 | _boolean_ | `false` |
| interval | 自动轮播间隔，单位为毫秒 | _number_ | `3000` |
| duration | 动画时长，单位为毫秒 | _number_ | `300` |
| initialIndex | 初始状态激活的轮播项的索引 | _number_ | `0` |
| showDot | 是否显示指示点 | _boolean_ | `true` |
| loop | 是否循环播放 | _boolean_ | `true` |
| dotPosition | 指示器位置 | _'top' \| 'bottom' \| 'left' \| 'right'_ | `bottom` |
| arrow | 箭头触发方式 | _'always' \| 'hover' \| 'never'_ | `always` |
| beforeChange | 索引改变前回调函数 | _(from: number, to: number) => void_ | - |
| afterChange | 索引改变后回调函数 | _(index: number) => void_ | - |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| onGoTo | 跳转到指定索引 | _index: number_ |
| onPrev | 跳转到上一个索引 | - |
| onNext | 跳转到下一个索引 | - |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- | 
| default | 需要显示的内容 | - |
| dot | 自定义指示点 | _{active: boolean; index: number}_ |
| arrowLeft | 自定义左箭头 | - |
| arrowRight | 自定义右箭头 | - |
