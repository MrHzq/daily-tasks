// 定义日程类型
export interface Schedule {
  id: string
  time: [string, string]
  name: string | string[]
  tag: string | undefined
  belong: string | undefined
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
  localStorage.setItem('schedules', JSON.stringify(schedules))
}

// 获取日程列表
export const getSchedulesToLocalStorage = (): Schedule[] => {
  const savedSchedules = localStorage.getItem('schedules')
  if (savedSchedules) return JSON.parse(savedSchedules)
  else return []
}
