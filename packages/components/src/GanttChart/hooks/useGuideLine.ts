import { ref } from 'vue'

import type { IGuideline } from '../components/TimeLine.vue'

/**
 * 设置辅导线
 * @param timeout 多少毫秒后消失
 * @returns 
 */
export const useGuideline = (timeout = 2500) => {
  const initGuideline = (): IGuideline => {
    return {
      beginTime: '',
      endTime: '',
      width: 0,
      height: 0,
      left: 0
    }
  }

  const guidelines = ref<IGuideline>(initGuideline())

  let guidelinesTimer: number
  const onSetGuideLine = (data: IGuideline) => {
    guidelinesTimer && clearTimeout(guidelinesTimer)

    const beginTime = data.beginTime.substring(11)
    const endTime = data.endTime.substring(11)
    guidelines.value = { ...data, beginTime, endTime }

    guidelinesTimer = setTimeout(() => {
      guidelines.value = initGuideline()
    }, timeout)
  }

  return {
    guidelines,
    onSetGuideLine
  }
}
