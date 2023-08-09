<script setup>
import simpleExample from './simple.vue';
</script>
<style scoped>
details {
  cursor: pointer;
}
</style>
# exceljs使用封装

针对生成并下载excel文件的封装，使用的是`exceljs`与`file-saver`库。

::: details 查看封装exceljs源码
<<< ../../../packages/utils/src/excel.ts  
:::

::: details 查看封装file-saver源码
<<< ../../../packages/utils/src/downloadFile.ts
:::

## 安装
::: tip 提示
使用`@stao-ui/utils`包中的`exceljs`相关方法，需要安装`exceljs`与`@stao-ui/utils`包。  
建议复制源码使用。
:::

```bash
pnpm i exceljs @stao-ui/utils
```

## 使用示例

点击按钮即可下载excel文件，查看效果。
<simple-example />

::: details 查看代码
<<< ./simple.vue
:::

