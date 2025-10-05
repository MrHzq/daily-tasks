// 定义日程类型
export interface Schedule {
  id: string
  time: [string, string]
  name: string | string[]
  tag: string
  belong: string
}

// {
//   id: '1',
//   time: ['09:25', '12:00'],
//   name: '早餐、上班',
//   tag: 'work',
//   belong: 'workday',
// },

// 保存日程到本地存储
export const saveSchedulesToLocalStorage = (schedules: Schedule[]) => {
  localStorage.setItem(
    'schedules',
    JSON.stringify(
      schedules.sort((a, b) => {
        // 按时间排序
        if (a.time[0] < b.time[0]) return -1
        if (a.time[0] > b.time[0]) return 1
        return 0
      }),
    ),
  )
}

// 获取日程列表
export const getSchedulesToLocalStorage = (): Schedule[] => {
  const savedSchedules = localStorage.getItem('schedules')
  if (savedSchedules) {
    return (JSON.parse(savedSchedules) as Schedule[]).sort((a, b) => {
      // 按时间排序
      if (a.time[0] < b.time[0]) return -1
      if (a.time[0] > b.time[0]) return 1
      return 0
    })
  } else return []
}
