import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob<{ default: RouteRecordRaw }>('../views/**/router/index.ts', {
  eager: true
})

const moduleRoutes: RouteRecordRaw[] = []
for (const path in modules) {
  moduleRoutes.push(modules[path].default)
}

export default moduleRoutes
