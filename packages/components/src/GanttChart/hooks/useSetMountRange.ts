import { throttle } from '@stao-ui/utils'
import { ref } from 'vue'

export const useSetMountRange = (defaultPagesize = 20) => {
  const mountRange = ref({
    beginLine: 0,
    endLine: 0
  })

  const initMountRange = () => {
    mountRange.value = {
      beginLine: 0,
      endLine: defaultPagesize
    }
  }

  initMountRange()

  // 计算开始、结束渲染的行数，不在该范围内的不渲染
  const onSetMountLineRange = throttle((e: UIEvent, lineHeight: number) => {
    const element = e.target as HTMLDivElement

    const scrollTop = element.scrollTop
    const height = element.clientHeight
    const pageLineCount = Math.ceil(height / lineHeight)
    if (scrollTop < height) {
      mountRange.value = {
        beginLine: 0,
        endLine: pageLineCount * 2
      }
      return
    }

    const currentLine = Math.ceil(scrollTop / lineHeight)
    mountRange.value.beginLine = currentLine - pageLineCount
    if (mountRange.value.beginLine < 0) {
      mountRange.value.beginLine = 0
    }
    mountRange.value.endLine = currentLine + pageLineCount
  }, 40)

  return {
    mountRange,
    initMountRange,
    onSetMountLineRange
  }
}
