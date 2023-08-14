import type { RouteRecordRaw } from 'vue-router'

const getModuleRoutes = () => {
  const moduleRoutes: RouteRecordRaw[] = []

  try {
    const modules = import.meta.glob<{ default: RouteRecordRaw }>('../views/**/router/index.ts', {
      eager: true
    })

    for (const path in modules) {
      moduleRoutes.push(modules[path].default)
    }
  } catch (ex) {
    console.error(ex)
  }

  return moduleRoutes
}

const moduleRoutes = getModuleRoutes()
export default moduleRoutes
