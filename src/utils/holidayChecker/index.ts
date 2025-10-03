import holidays2025 from './2025.json'

const holidaysYYYYMap = {
  '2025': holidays2025,
}

interface DayItem {
  /** 节日名称 */
  name: string
  /** 日期, ISO 8601 格式 */
  date: string
  /** 是否为休息日 */
  isOffDay: boolean
}

let holidaysYYYY: {
  days: Array<DayItem>
} = {
  days: [],
}

const fetchHolidaysYYYY = async () => {
  const YYYY = new Date().getFullYear().toString() as keyof typeof holidaysYYYYMap

  if (holidaysYYYYMap[YYYY]) {
    return (holidaysYYYY = holidaysYYYYMap[YYYY])
  }

  // "url": "https://raw.githubusercontent.com/NateScarlet/holiday-cn/master/2025.json",
  fetch(`https://raw.githubusercontent.com/NateScarlet/holiday-cn/master/${YYYY}.json`)
    .then((res) => res.json())
    .then((data) => {
      holidaysYYYY = data
    })
    .catch((error) => {
      console.error('获取节假日数据失败:', error)
    })
}

await fetchHolidaysYYYY()

class ChineseHolidayChecker {
  // 存储节假日数据：
  private holidayList: Array<DayItem> = []

  // 存储调休工作日：原本是周末但需要上班的日期
  private adjustWorkdayList: Array<DayItem> = []

  constructor() {
    this.init()
  }

  private init() {
    if (holidaysYYYY.days.length === 0) return console.warn('节假日数据为空')

    // 初始化节假日数据（示例数据，实际使用时需要更新为最新数据）
    this.initializeHolidays()
    this.initializeWorkdays()
  }

  /**
   * 初始化节假日数据
   * 当年的所有法定节假日
   */
  private initializeHolidays() {
    this.holidayList = holidaysYYYY.days.filter((day) => day.isOffDay)
  }

  /**
   * 初始化调休工作日数据
   * 这些日期原本是周末，但需要上班
   */
  private initializeWorkdays() {
    this.adjustWorkdayList = holidaysYYYY.days
      .filter((day) => !day.isOffDay)
      .map((day) => ({
        ...day,
        name: day.name + '（调休）',
      }))
  }

  /**
   * 格式化日期为 YYYY-MM-DD 字符串
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  /**
   * 判断日期是否为周末（周六或周日）
   */
  private isWeekend(date: Date): boolean {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  /**
   * 判断指定日期是否为法定节假日
   * @param date 要判断的日期，默认为当前日期
   * @returns 是节假日的信息，undefined: 不是节假日
   */
  isHoliday(date: Date | string = new Date()): [boolean, DayItem] {
    date = typeof date === 'string' ? new Date(date) : date
    const dateStr = this.formatDate(date)

    // 检查是否在节假日列表中
    const isHoliday = this.holidayList.find((day) => day.date === dateStr)

    if (isHoliday) return [true, isHoliday]

    // 检查是否是周末
    if (this.isWeekend(date)) {
      // 是否在调休工作日列表中
      const isAdjustWorkday = this.adjustWorkdayList.find((day) => day.date === dateStr)
      if (isAdjustWorkday) return [false, isAdjustWorkday]
      else
        return [
          true,
          {
            name: '周末',
            date: dateStr,
            isOffDay: true,
          },
        ]
    }

    return [
      false,
      {
        name: '工作日',
        date: dateStr,
        isOffDay: false,
      },
    ]
  }

  /**
   * 判断指定日期是否为工作日
   * @param date 要判断的日期，默认为当前日期
   * @returns true: 是工作日，false: 不是工作日
   */
  isWorkday(date: Date = new Date()): boolean {
    return !this.isHoliday(date)
  }
}

export default ChineseHolidayChecker
