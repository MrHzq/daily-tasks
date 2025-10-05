<template>
  <div class="flex overflow-auto flex-col gap-2 p-2">
    <!-- 标题和新增按钮 -->
    <div class="flex justify-between items-center">
      <h2>Schedule List</h2>
      <div class="flex space-x-2">
        <button
          class="px-3 py-1 text-white bg-green-500 rounded-md transition duration-200 hover:bg-green-600"
          @click="openAddDialog"
        >
          Add
        </button>

        <button
          class="px-3 py-1 text-white bg-yellow-500 rounded-md transition duration-200 hover:bg-yellow-600"
          @click="copy(schedules)"
        >
          Export
        </button>

        <button
          class="px-3 py-1 text-white bg-sky-500 rounded-md transition duration-200 hover:bg-sky-600"
          @click="openImportDialog"
        >
          Import
        </button>
      </div>
    </div>

    <!-- 筛选和搜索 -->
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="relative flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="p-2 w-full bg-white rounded-lg border border-gray-300 transition-all dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="flex flex-wrap gap-2">
        <select
          v-model="filterTag"
          class="p-2 bg-white rounded-lg border border-gray-300 transition-all dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Tags</option>
          <option v-for="tag in tags" :key="tag.id" :value="tag.name">{{ tag.name }}</option>
        </select>
        <select
          v-model="filterBelong"
          class="p-2 bg-white rounded-lg border border-gray-300 transition-all dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Belong</option>
          <option v-for="belong in belongList" :key="belong" :value="belong">
            {{ belong }}
          </option>
        </select>
      </div>
    </div>

    <!-- 列表 -->
    <div class="flex-1">
      <template v-if="filteredSchedules.length > 0">
        <div class="grid gap-4">
          <div
            v-for="schedule in filteredSchedules"
            :key="schedule.id"
            :class="[tagColorMap[schedule.tag]?.border]"
            class="p-2 bg-white rounded-xl border-l-4 shadow-md transition-all hover:shadow-lg"
          >
            <div class="flex flex-col gap-2 justify-between sm:flex-row sm:items-center">
              <h4 class="font-semibold">
                <div
                  v-for="(name, index) in Array.isArray(schedule.name)
                    ? schedule.name
                    : [schedule.name]"
                  :key="name"
                >
                  <template v-if="Array.isArray(schedule.name) ? schedule.name.length > 1 : false">
                    {{ index + 1 }}、
                  </template>
                  {{ name }}
                </div>
              </h4>
              <div class="flex items-center text-gray-500 dark:text-gray-400">
                <span> {{ schedule.time.join('~') }}</span>
              </div>

              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                  <span
                    class="px-3 py-1 text-sm rounded-full"
                    :class="[(tagColorMap[schedule.tag]?.bg || 'bg-gray-10') + '0']"
                  >
                    {{ schedule.tag }}
                  </span>
                  <span class="px-3 py-1 text-sm bg-gray-100 rounded-full">
                    {{ schedule.belong }}
                  </span>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    class="px-3 py-1 text-sm text-white bg-blue-500 rounded transition duration-200 hover:bg-blue-600"
                    @click="openEditDialog(schedule)"
                  >
                    Edit
                  </button>
                  <button
                    class="px-3 py-1 text-sm text-white bg-red-500 rounded transition duration-200 hover:bg-red-600"
                    @click="openDeleteDialog(schedule)"
                  >
                    Del
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 空状态提示 -->
      <template v-else>
        <div class="flex flex-col justify-center items-center h-full text-center">
          <h3 class="mb-2 text-xl font-medium">No Found</h3>
        </div>
      </template>
    </div>

    <!-- 新增/编辑 对话框 -->
    <div
      v-if="showDialog"
      class="flex fixed inset-0 z-50 justify-center items-center p-4 backdrop-blur-sm bg-black/50"
      @click="closeDialog"
    >
      <div
        class="p-6 w-full max-w-sm bg-white rounded-lg transition-all duration-300 transform"
        @click.stop
      >
        <h3 class="mb-4 text-lg font-semibold">{{ isEditing ? 'Edit' : 'Add' }}</h3>

        <form @submit.prevent="saveData">
          <div class="space-y-4">
            <div>
              <label class="block mb-1 text-sm font-medium" for="name">Schedule Name</label>
              <input
                v-model="currentSchedule.name"
                id="name"
                type="text"
                class="px-4 py-2 w-full bg-white rounded-lg border border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Schedule name"
                autocomplete="off"
                autofocus
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 text-sm font-medium" for="startTime">Start Time</label>
                <input
                  id="startTime"
                  v-model="currentSchedule.time[0]"
                  type="time"
                  required
                  class="px-4 py-2 w-full bg-white rounded-lg border border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium" for="endTime">End Time</label>
                <input
                  id="endTime"
                  v-model="currentSchedule.time[1]"
                  type="time"
                  required
                  class="px-4 py-2 w-full bg-white rounded-lg border border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 text-sm font-medium" for="tag">Tag</label>
                <select
                  v-model="currentSchedule.tag"
                  id="tag"
                  required
                  class="px-4 py-2 w-full bg-white rounded-lg border border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option v-for="tag in tags" :key="tag.id" :value="tag.name">
                    {{ tag.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium" for="belong">Belong</label>
                <select
                  v-model="currentSchedule.belong"
                  id="belong"
                  required
                  class="px-4 py-2 w-full bg-white rounded-lg border border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option v-for="belong in belongList" :key="belong" :value="belong">
                    {{ belong }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-4 space-x-3">
            <button
              type="button"
              class="px-3 py-1 rounded-lg border border-gray-300 transition-colors hover:bg-gray-100"
              @click="closeDialog"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saveButtonDisabled"
              class="px-3 py-1 text-white bg-sky-500 rounded-md transition duration-200 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 确认删除对话框 -->
    <div
      v-if="showDeleteDialog"
      class="flex fixed inset-0 z-50 justify-center items-center p-4 backdrop-blur-sm bg-black/50"
      @click="closeDeleteDialog"
    >
      <div
        class="p-6 w-full max-w-md bg-white rounded-xl shadow-xl transition-all transform dark:bg-gray-800"
        @click.stop
      >
        <div class="text-center">
          <h3 class="mb-4 text-lg font-semibold">Confirm Delete</h3>
          <p class="text-gray-500 dark:text-gray-400">
            Delete this schedule: {{ deleteSchedule?.name }}?
          </p>
        </div>

        <div class="flex justify-center mt-4 space-x-3">
          <button
            class="px-3 py-1 rounded-lg border border-gray-300 transition-colors hover:bg-gray-100"
            @click="closeDeleteDialog"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-3 py-1 text-white bg-red-600 rounded-lg shadow-sm transition-all hover:bg-red-700 hover:shadow"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- 导入弹窗 -->
    <div
      v-if="showImportDialog"
      class="flex fixed inset-0 z-50 justify-center items-center p-4 backdrop-blur-sm bg-black/50"
      @click="closeImportDialog"
    >
      <div
        class="p-6 w-full max-w-sm bg-white rounded-lg transition-all duration-300 transform"
        @click.stop
      >
        <h3 class="mb-4 text-lg font-semibold">Import Schedule</h3>

        <form @submit.prevent="importTagsFromJson">
          <div class="space-y-4">
            <div>
              <label class="block mb-1 text-sm font-medium" for="importJson">Schedule Data</label>
              <textarea
                v-model="importJson"
                id="importJson"
                rows="4"
                class="px-4 py-2 w-full bg-white rounded-lg border border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste data here"
                autocomplete="off"
                autofocus
              ></textarea>
            </div>
          </div>

          <div class="flex justify-end mt-4 space-x-3">
            <button
              type="button"
              class="px-3 py-1 rounded-md border border-gray-300 transition duration-200 hover:bg-gray-50"
              @click="closeImportDialog"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!importJson.trim()"
              class="px-3 py-1 text-white bg-sky-500 rounded-md transition duration-200 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Import
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 通知提示 -->
    <div
      v-if="notification.message"
      class="fixed right-4 bottom-4 p-4 max-w-sm rounded-lg shadow-lg opacity-100 transition-all duration-300 transform translate-y-0"
      :class="
        notification.type === 'success'
          ? 'bg-green-50 text-green-800 dark:bg-green-900/90 dark:text-green-100'
          : 'bg-red-50 text-red-800 dark:bg-red-900/90 dark:text-red-100'
      "
    >
      <div class="flex gap-3 items-start">
        <div class="flex-shrink-0 mt-0.5">
          <i
            class="fa"
            :class="notification.type === 'success' ? 'fa-check-circle' : 'fa-times-circle'"
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <h4 class="font-medium">{{ notification.title }}</h4>
          <p class="mt-1 text-sm">{{ notification.message }}</p>
        </div>
        <button
          @click="notification = { message: '', title: '', type: 'success' }"
          class="flex-shrink-0 ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="关闭通知"
        >
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { copy } from '@/utils/common'

import { getTagsToLocalStorage, saveTagsToLocalStorage, tagColorMap, type Tag } from '@/data/tag'

import { belongList } from '@/constant'

import {
  getSchedulesToLocalStorage,
  saveSchedulesToLocalStorage,
  type Schedule,
} from '@/data/schedule'

// 标签列表
const tags = ref<Tag[]>([])

// 初始化 标签列表 数据
onMounted(() => {
  const savedTags = getTagsToLocalStorage()
  tags.value = savedTags
  saveTagsToLocalStorage(tags.value)
})

// 初始化日程数据
const schedules = ref<Schedule[]>([])

// 初始化 日程列表 数据
onMounted(() => {
  const savedSchedules = getSchedulesToLocalStorage()
  schedules.value = savedSchedules
  saveSchedulesToLocalStorage(schedules.value)
})

// 搜索和筛选
const searchQuery = ref('')
const filterTag = ref('')
const filterBelong = ref('')

// 过滤后的日程列表
const filteredSchedules = computed<Schedule[]>(() => {
  return schedules.value.filter((schedule) => {
    const matchesSearch = Array.isArray(schedule.name)
      ? schedule.name.some((name) => name.toLowerCase().includes(searchQuery.value.toLowerCase()))
      : schedule.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesTag = !filterTag.value || schedule.tag === filterTag.value
    const matchesBelong = !filterBelong.value || schedule.belong === filterBelong.value

    return matchesSearch && matchesTag && matchesBelong
  })
})

// 对话框状态
const showDialog = ref(false)
const isEditing = ref(false)

const currentSchedule = ref<Schedule>({
  id: '',
  name: '',
  time: ['', ''],
  tag: '',
  belong: '',
})

const saveButtonDisabled = computed(() => {
  return !(Array.isArray(currentSchedule.value.name)
    ? currentSchedule.value.name.some((name) => name.trim())
    : currentSchedule.value.name.trim() &&
      currentSchedule.value.time[0] &&
      currentSchedule.value.time[1] &&
      currentSchedule.value.tag &&
      currentSchedule.value.belong)
})

// 打开新增对话框
const openAddDialog = () => {
  isEditing.value = false

  currentSchedule.value = {
    id: '',
    time: ['', ''],
    name: '',
    tag: tags.value[0]?.name || '',
    belong: belongList[0] || '',
  }

  showDialog.value = true
}

// 打开编辑对话框
const openEditDialog = (schedule: Schedule) => {
  isEditing.value = true

  currentSchedule.value = { ...schedule }

  showDialog.value = true
}

// 关闭对话框
const closeDialog = () => {
  showDialog.value = false
}

// 保存（新增或编辑）
const saveData = () => {
  if (saveButtonDisabled.value) return

  if (isEditing.value) {
    // 编辑
    const index = schedules.value.findIndex((i) => i.id === currentSchedule.value.id)
    if (index !== -1) {
      schedules.value[index] = { ...currentSchedule.value }
      showNotification('更新成功', '日程已成功更新', 'success')
    }
  } else {
    // 新增
    const newData: Schedule = {
      ...currentSchedule.value,
      id: Math.random().toString(36).substring(2),
    }
    schedules.value.push(newData)
    showNotification('添加成功', '新日程已成功添加', 'success')
  }

  saveSchedulesToLocalStorage(schedules.value)
  closeDialog()
}

// 删除确认对话框
const showDeleteDialog = ref(false)
// 待删除的日程
const deleteSchedule = ref<Schedule | null>(null)

// 打开删除确认
const openDeleteDialog = (schedule: Schedule) => {
  deleteSchedule.value = schedule
  showDeleteDialog.value = true
}

// 关闭删除确认
const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  deleteSchedule.value = null
}

// 确认删除
const confirmDelete = () => {
  if (deleteSchedule.value) {
    schedules.value = schedules.value.filter((s) => s.id !== deleteSchedule.value?.id)
    saveSchedulesToLocalStorage(schedules.value)
    showNotification('删除成功', '日程已成功删除', 'success')
  }
  closeDeleteDialog()
}

// 通知提示
const notification = ref({
  message: '',
  title: '',
  type: 'success' as 'success' | 'error',
})
// 显示通知
const showNotification = (title: string, message: string, type: 'success' | 'error') => {
  notification.value = { title, message, type }

  // 3秒后自动关闭
  setTimeout(() => {
    notification.value = { message: '', title: '', type: 'success' }
  }, 3000)
}

// 导入弹窗状态
const showImportDialog = ref(false)
const importJson = ref('')

// 打开导入弹窗
const openImportDialog = () => {
  showImportDialog.value = true
  importJson.value = ''
}

// 关闭导入弹窗
const closeImportDialog = () => {
  showImportDialog.value = false
  importJson.value = ''
}

// 从JSON导入标签
const importTagsFromJson = () => {
  try {
    const importedData = JSON.parse(importJson.value)
    if (Array.isArray(importedData)) {
      schedules.value = importedData
      saveSchedulesToLocalStorage(schedules.value)
      closeImportDialog()
    } else {
      alert('Invalid JSON Array.')
    }
  } catch (error) {
    console.log('[ error ] >', error)
    alert('Invalid JSON Format.')
  }
}
</script>
