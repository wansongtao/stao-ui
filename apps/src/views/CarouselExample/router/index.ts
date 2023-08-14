import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/carousel-example',
  name: 'CarouselExample',
  component: () => import('../index.vue'),
  meta: {
    title: '轮播图组件示例'
  }
}

export default route
