<template>
  <div class="box-border overflow-auto relative flex-1 p-4 mx-auto w-full">
    <!-- 日程表容器 -->
    <div class="overflow-hidden bg-white rounded-lg shadow-md">
      <!-- 日程表标题行 -->
      <div
        class="px-6 py-4 text-center border-b border-gray-200"
        @click="scrollToElement(currTimeInScheduleIndex)"
      >
        <h2 class="text-xl font-semibold text-gray-900">
          今天为{{ isHoliday ? '休息日' : '工作日' }}
          {{ dayInfo.name === '工作日' ? '' : '- ' + dayInfo.name }}
        </h2>
        <div class="grid grid-cols-2 gap-2 mt-2 text-sm xm:grid-cols-4">
          <div v-for="item in tagList" :key="item.tag" class="flex justify-center items-center">
            <span
              class="inline-block mr-2 w-3 h-3 rounded-full"
              :class="[tagColorMap[item.tag].bg + '0']"
            ></span>
            <span :class="[tagColorMap[item.tag].text]">{{ item.name }}:</span>
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">{{
              minuteFormat(tagTimeTotal[item.tag] || 0)
            }}</span>
          </div>
        </div>
      </div>

      <!-- 日程表内容 -->
      <div class="text-center divide-y divide-gray-200 content dark:divide-gray-700">
        <template v-for="(item, index) in currScheduleList" :key="item.name">
          <div
            :id="`${index}`"
            :class="[index === currTimeInScheduleIndex ? 'bg-sky-500 text-white' : '']"
            class="p-4 border-b border-gray-200 dark:border-gray-700"
          >
            <div class="p-4 rounded-lg" :class="[tagColorMap[item.tag].bg]">
              <div class="font-medium" :class="[tagColorMap[item.tag].text]">
                {{ item.time.join('~') }}
              </div>
              <div
                v-for="(name, index) in Array.isArray(item.name) ? item.name : [item.name]"
                :key="name"
                class="mt-1 text-gray-800 dark:text-gray-200"
              >
                <template v-if="Array.isArray(item.name) ? item.name.length > 1 : false">
                  {{ index + 1 }}、
                </template>
                {{ name }}
              </div>
              <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ minuteFormat(calculateTimeDifference(item.time)) }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 悬浮定位按钮 -->
    <div class="bottom-[50%] right-4 position" @click="scrollToElement(currTimeInScheduleIndex)">
      <div
        class="flex justify-center items-center p-2 w-10 h-10 text-white bg-sky-500 rounded-full shadow-lg"
      >
        <div class="w-4 h-4 bg-white rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export interface ScheduleItem {
  time: [string, string]
  name: string | string[]
  tag: string
  belong: string
}
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

const props = defineProps<{
  currTime: string
  isHoliday: boolean
  scheduleList: ScheduleItem[]
  dayInfo: { date: string; name: string }
}>()

// 筛选当前日程列表（根据是否为假日和是否为工作日）
const currScheduleList = computed(() => {
  return props.scheduleList.filter(
    (item) => item.belong === (props.isHoliday ? 'holiday' : 'workday') || item.belong === 'both',
  )
})

// 判断当前 currTime 处于 currScheduleList 的哪一个时间内，返回索引
const currTimeInScheduleIndex = computed(() => {
  return currScheduleList.value.findIndex((item) => {
    const [startTime, endTime] = item.time
    return props.currTime >= startTime && props.currTime <= endTime
  })
})

// 计算时间差（处理跨天情况）
const calculateTimeDifference = (times: [string, string]) => {
  // 解析输入的两个时间
  const [startTime, endTime] = times

  // 分割小时和分钟
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  // 转换为总分钟数
  const startTotalMinutes = (startHour || 0) * 60 + (startMinute || 0)
  const endTotalMinutes = (endHour || 0) * 60 + (endMinute || 0)

  // 计算差值（处理跨天情况）
  let diffMinutes = endTotalMinutes - startTotalMinutes
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60 // 如果结束时间早于开始时间，加上24小时的分钟数
  }
  return diffMinutes
}

// 格式化分钟为小时分钟格式
const minuteFormat = (minute: number) => {
  // 转换为小时和分钟
  const hours = Math.floor(minute / 60)
  const minutes = minute % 60

  // 格式化结果
  return `${hours}小时` + (minutes ? `${minutes}分钟` : '')
}

// 标签颜色映射
const tagColorMap: Record<string, { bg: string; text: string }> = {
  sleep: { bg: 'bg-purple-50', text: 'text-purple-800' },
  work: { bg: 'bg-amber-50', text: 'text-amber-800' },
  eat: { bg: 'bg-blue-50', text: 'text-blue-800' },
  free: { bg: 'bg-green-50', text: 'text-green-800' },
}

// 标签列表
const tagList: Array<{ tag: keyof typeof tagColorMap; name: string }> = [
  { tag: 'sleep', name: '睡觉' },
  { tag: 'work', name: '上班' },
  { tag: 'eat', name: '吃饭' },
  { tag: 'free', name: '自由' },
]

// 计算每个标签的时间总和
const tagTimeTotal = computed(() => {
  return currScheduleList.value.reduce(
    (acc, cur) => {
      acc[cur.tag] = (acc[cur.tag] || 0) + Number(calculateTimeDifference(cur.time))
      return acc
    },
    {} as Record<keyof typeof tagColorMap, number>,
  )
})

// 滚动到指定元素
const scrollToElement = (index: number) => {
  const element = document.getElementById(index.toString())
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  scrollToElement(currTimeInScheduleIndex.value)
})
</script>

<style scoped>
/* 基础过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 日程项悬停效果  */
.content div[class*='bg-'] {
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.content div[class*='bg-']:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
