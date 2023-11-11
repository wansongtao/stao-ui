import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/test-page',
  name: 'TestPage',
  component: () => import('../index.vue'),
  meta: {
    title: '测试页面'
  }
}

export default route
