<template>
  <div class="flex flex-col bg-gray-50 transition-colors duration-300">
    <!-- 页面头部 -->
    <header class="relative z-10 p-4 bg-white shadow-sm">
      <div class="mx-auto max-w-7xl">
        <h1 class="text-3xl font-bold text-center text-gray-900">{{ dayInfo.date }}日程</h1>
        <p class="mt-2 text-center text-gray-600">管理您的工作与生活时间</p>
        <p class="mt-2 text-center text-red-600">{{ currTime }}</p>
      </div>
    </header>

    <ScheduleIndex
      :currTime="currTime"
      :dayInfo="dayInfo"
      :isHoliday="isHoliday"
      :scheduleList="scheduleList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ScheduleIndex, { type ScheduleItem } from '@/components/schedule/ScheduleIndex.vue'
import ChineseHolidayChecker from '@/utils/holidayChecker'

const holidayChecker = new ChineseHolidayChecker()

const [isHoliday, dayInfo] = holidayChecker.isHoliday()

// 更新当前时间 hh:mm:ss
const updateCurrTime = () => {
  const now = new Date()
  const hour = now.getHours().toString().padStart(2, '0')
  const minute = now.getMinutes().toString().padStart(2, '0')
  const second = now.getSeconds().toString().padStart(2, '0')
  return `${hour}:${minute}:${second}`
}

// 当前时间 hh:mm:ss
const currTime = ref(updateCurrTime())

// 每秒钟更新一次当前时间
setInterval(() => (currTime.value = updateCurrTime()), 1000)

const scheduleList = ref<ScheduleItem[]>([
  {
    name: '睡觉、起床',
    time: ['23:00', '08:00'],
    tag: 'sleep',
    belong: 'both',
  },
  {
    name: '洗漱、学英语',
    time: ['08:00', '09:25'],
    tag: 'free',
    belong: 'both',
  },
  {
    name: '早餐、上班',
    time: ['09:25', '12:00'],
    tag: 'work',
    belong: 'workday',
  },
  {
    name: '早餐、??',
    time: ['09:25', '12:00'],
    tag: 'free',
    belong: 'holiday',
  },
  {
    name: '午饭、午休',
    time: ['12:00', '13:30'],
    tag: 'eat',
    belong: 'both',
  },
  {
    name: '下午工作',
    time: ['13:30', '17:00'],
    tag: 'work',
    belong: 'workday',
  },
  {
    name: '??',
    time: ['13:30', '17:00'],
    tag: 'free',
    belong: 'holiday',
  },
  {
    name: '晚餐',
    time: ['17:00', '17:30'],
    tag: 'eat',
    belong: 'both',
  },
  {
    name: '下午上班',
    time: ['17:30', '18:30'],
    tag: 'work',
    belong: 'workday',
  },
  {
    name: '阅读',
    time: ['17:30', '18:30'],
    tag: 'free',
    belong: 'holiday',
  },
  {
    name: ['写一篇《认知觉醒》', '推进《壹人成》进度', '健身、脚上八锦缎', '做些其他的事情……'],
    time: ['18:30', '23:00'],
    tag: 'free',
    belong: 'both',
  },
])
</script>
