import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/aswitch-example',
  name: 'ASwitchExample',
  component: () => import('../index.vue'),
  meta: {
    title: 'Ant Design Switch 组件示例'
  }
}

export default route
