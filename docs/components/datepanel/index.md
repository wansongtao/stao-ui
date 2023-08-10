<script lang="ts" setup>
import SimpleExample from './SimpleExample.vue'
</script>
# 日期面板组件

点击文本选择日期范围。接收一个 `title` 属性与`activeKey`属性，`activeKey`表示需要选中的文本。改变`activeKey`属性，组件会自动更新选中的文本。  
抛出一个 `changeDate` 事件，当用户点击文本时，会触发该事件，事件参数为当前选中的文本表示的日期范围，格式：`{ startDate: string; endDate: string; }`。

::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::  

::: details 源代码
<<< ../../../packages/components/src/DatePanel/index.vue
:::

## 使用实例

<SimpleExample />

::: details 查看示例代码
<<< ./SimpleExample.vue
:::
