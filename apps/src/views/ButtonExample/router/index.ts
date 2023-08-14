import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/button-example',
  name: 'ButtonExample',
  component: () => import('../index.vue'),
  meta: {
    title: '按钮组件示例'
  }
}

export default route
