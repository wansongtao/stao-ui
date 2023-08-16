# vueamap 地图组件

二次封装的vue-amap的地图组件。支持搜索、定位、标记等功能。改变选中后，抛出地址、经纬度等信息。该组件包大小过大，且不好用，建议使用其他库。这里只是记录一下。

::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::

![img](./map.png)

::: details 组件源代码
<<< ../../../../apps/src/components/SMap/index.vue
:::

换成你自己的高德地图key。
::: details vue-amap 初始化代码
<<< ../../../../apps/src/utils/initMap.ts
:::

在main.ts中引入并注册组件。
```ts
import '@/utils/initMap'
import VueAMap from '@vuemap/vue-amap'

const app = createApp(App)
app.use(VueAMap)
```
