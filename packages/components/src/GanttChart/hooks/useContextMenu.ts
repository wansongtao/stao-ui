import { type Ref, nextTick, onMounted, onUnmounted, ref } from 'vue'

/**
 * 
 * @param before 返回 false 则直接结束函数的执行
 * @param after 
 * @returns 
 */
export const useContextMenu = <T>(
  before: (data: T) => boolean,
  after: (data: T) => void
) => {
  const contextmenuInfo: Ref<{
    left: string
    top: string
    show: boolean
    direction: 'top' | 'bottom'
    data?: T
  }> = ref({
    left: '',
    top: '',
    show: false,
    direction: 'top' as 'top' | 'bottom'
  })
  const contextRef = ref<HTMLDivElement>()

  const onContextmenu = (e: MouseEvent, item: T, lineHeight: number) => {
    e.preventDefault()
    if (!before(item)) {
      return
    }

    contextmenuInfo.value.left = e.pageX + 'px'
    contextmenuInfo.value.top = e.pageY - lineHeight / 2 + 'px'
    contextmenuInfo.value.show = true
    contextmenuInfo.value.data = item

    nextTick(() => {
      if (contextRef.value!.clientHeight > e.pageY - lineHeight) {
        contextmenuInfo.value.direction = 'bottom'
      } else {
        contextmenuInfo.value.direction = 'top'
      }
    })

    after(item)
  }

  const onCloseContextMenu = () => {
    if (contextmenuInfo.value.show === false) {
      return
    }

    contextmenuInfo.value.show = false
  }

  const onClickContextMenuOutSide = (e: MouseEvent) => {
    if (!e.target || !contextmenuInfo.value.show) {
      return
    }

    const res = contextRef.value?.contains(e.target as HTMLElement)
    if (!res) {
      contextmenuInfo.value.show = false
    }
  }

  onMounted(() => {
    document.body.addEventListener('click', onClickContextMenuOutSide)
  })
  onUnmounted(() => {
    document.body.removeEventListener('click', onClickContextMenuOutSide)
  })

  return {
    contextmenuInfo,
    contextRef,
    onContextmenu,
    onCloseContextMenu,
  }
}
