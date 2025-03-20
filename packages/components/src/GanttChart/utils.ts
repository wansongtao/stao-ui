import dayjs from 'dayjs';
import type { ITimeLine } from './components/TimeLine.vue'

/**
 * 根据时间范围生成时间刻度表
 * @param beginDate
 * @param endDate
 */
export function getTimeLineList(beginDate: string, endDate: string) {
  const list: ITimeLine[] = []
  const maxDay = Math.abs(dayjs(beginDate).diff(dayjs(endDate), 'day')) + 1
  for (let i = 0; i < maxDay; i++) {
    let title = ''
    if (i === 0) {
      title = dayjs(beginDate).format('YYYY-MM-DD')
    } else {
      title = dayjs(beginDate).endOf('day').add(i, 'day').format('YYYY-MM-DD')
    }

    list.push({
      title,
      text: '0:00'
    })

    list.push(...[{ text: '6:00' }, { text: '12:00' }, { text: '18:00' }])
  }

  return list
}

/**
 * 根据时间范围计算宽度，单位：px
 * @param beginTime 开始时间
 * @param endTime 结束时间
 * @param hourWidth 每小时宽度，单位：px
 */
export function timeRangeToWidth(beginTime: string, endTime: string, hourWidth: number) {
  const minutes = Math.abs(dayjs(beginTime).diff(dayjs(endTime), 'minute'));

  return Math.ceil(minutes * (hourWidth / 60));
}
