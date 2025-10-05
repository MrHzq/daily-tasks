<template>
  <div class="flex flex-col bg-gray-50 transition-colors duration-300">
    <!-- 页面头部 -->
    <header class="relative z-10 p-4 bg-white shadow-sm">
      <div class="flex flex-col gap-2 items-center">
        <h1 class="text-3xl font-bold text-gray-900">{{ dayInfo.date }}日程</h1>
        <p class="text-red-600 r">{{ currTime }}</p>

        <div>
          <button
            v-if="isInCanEatTime"
            class="px-3 py-1 text-sm text-white bg-green-500 rounded-md transition duration-200 hover:bg-green-600"
          >
            可进食({{ canEatTime.join(' - ') }})
          </button>
          <button
            v-else
            class="px-3 py-1 text-sm text-white bg-red-500 rounded transition duration-200 hover:bg-red-600"
          >
            断食中({{ canNotEatTime.join(' - ') }})
          </button>
        </div>
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
import { computed, onMounted, ref } from 'vue'

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

const canEatTime = ref(['09:30', '17:30']) // 8 小时
const canNotEatTime = ref(['17:30', '09:30']) // 16 小时

// 计算当前时间是否在可吃时间范围内
const isInCanEatTime = computed(() => {
  const currentTime = currTime.value
  return canEatTime.value.some((time) => currentTime >= time)
})
</script>
