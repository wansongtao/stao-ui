# AutoScroll 自动滚动

自动(无缝)滚动组件，支持水平和垂直方向。

::: details 组件源码
<<< ../../../../packages/components/src/AutoScroll/AutoScroll.vue
:::

::: details vue2.x 版本
<<< ./Vue2Demo.vue
:::

## 基本用法

<script lang="ts" setup>
import ExampleView from './ExampleView.vue'
</script>

内容超出容器宽度/高度时，自动滚动。内容不足时，不滚动。内容大小变化时，自动调整滚动。

<ExampleView />

::: details 示例代码
<<< ./ExampleView.vue
:::

## API

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 滚动方向 | _'horizontal'\|'vertical'_ | `horizontal` |
| speed | 滚动速度，单位：px/s | _number_ | `50` |
| gap | 两项间隔(为了实现无缝滚动，会创建两个一样的子项) | _string_ | `20px` |
| timingFunction | 动画函数 | _string_ | `linear` |
| animateDirection | 动画方向 | _'normal'\|'reverse'\|'alternate'\|'alternate-reverse'_ | `normal` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 需要滚动的内容 | - |
