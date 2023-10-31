import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/event-bus',
  name: 'EventBus',
  component: () => import('../index.vue'),
  meta: {
    title: 'EventBus 示例'
  }
}

export default route
