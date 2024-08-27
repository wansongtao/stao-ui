# 获取项目版本

使用`shelljs`模块，读取git的tag信息，获取项目的版本号，开发环境使用commit哈希值，生产环境使用tag。

::: details 实现源码
<<< ../../../../packages/utils/src/common/version.ts
:::

## 安装

需要安装`shelljs`、`@types/shelljs`模块。

```bash
pnpm add shelljs @types/shelljs -D
```

## 在 vite.config.ts 中使用

```ts
import version from 'version.ts'

import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    __APP_VERSION__: version
  }
})
```
