<template>
  <div class="flex flex-col bg-gray-50 transition-colors duration-300">
    <!-- 页面头部 -->
    <header class="relative z-10 p-4 bg-white shadow-sm">
      <div class="mx-auto max-w-7xl">
        <h1 class="text-3xl font-bold text-center text-gray-900">{{ dayInfo.date }}日程</h1>
        <p class="mt-2 text-center text-red-600">{{ currTime }}</p>
      </div>
    </header>

    <ScheduleIndex
      :currTime="currTime"
      :dayInfo="dayInfo"
      :isHoliday="isHoliday"
      :schedules="schedules"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import ChineseHolidayChecker from '@/utils/holidayChecker'
import ScheduleIndex from '@/components/schedule/ScheduleIndex.vue'
import { getSchedulesToLocalStorage, type Schedule } from '@/data/schedule'

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

const schedules = ref<Schedule[]>([])

// 初始化 日程列表 数据
onMounted(() => {
  const savedSchedules = getSchedulesToLocalStorage()
  schedules.value = savedSchedules
})
</script>
