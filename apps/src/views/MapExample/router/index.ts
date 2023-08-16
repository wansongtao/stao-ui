import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/map-example',
  name: 'MapExample',
  component: () => import('../index.vue'),
  meta: {
    title: '地图组件示例'
  }
}

export default route
