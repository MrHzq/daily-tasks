<template>
  <div class="flex overflow-auto flex-col gap-2 p-2">
    <!-- 标题和新增按钮 -->
    <div class="flex justify-between items-center">
      <h2>Tag List</h2>
      <div class="flex space-x-2">
        <button
          class="px-3 py-1 text-white bg-green-500 rounded-md transition duration-200 hover:bg-green-600"
          @click="openAddDialog"
        >
          Add
        </button>

        <button
          class="px-3 py-1 text-white bg-yellow-500 rounded-md transition duration-200 hover:bg-yellow-600"
          @click="copy(tags)"
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

    <!-- 列表 -->
    <div class="flex-1">
      <template v-if="tags.length > 0">
        <div class="flex flex-col gap-2">
          <div
            v-for="tag in tags"
            :key="tag.id"
            :class="[tagColorMap[tag.name]?.bg || 'bg-gray-10']"
            class="flex justify-between items-center p-3 rounded-md transition duration-200"
          >
            <span class="font-medium text-gray-800">{{ tag.name }}</span>
            <div class="flex space-x-2">
              <button
                class="px-3 py-1 text-sm text-white bg-blue-500 rounded transition duration-200 hover:bg-blue-600"
                @click="openEditDialog(tag)"
              >
                Edit
              </button>
              <button
                class="px-3 py-1 text-sm text-white bg-red-500 rounded transition duration-200 hover:bg-red-600"
                @click="openDeleteDialog(tag)"
              >
                Del
              </button>
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
      class="flex fixed inset-0 z-50 justify-center items-center p-2 backdrop-blur-sm bg-black/50"
      @click="closeDialog"
    >
      <div
        class="p-4 w-full max-w-sm bg-white rounded-lg transition-all duration-300 transform"
        @click.stop
      >
        <h3 class="mb-2 text-lg font-semibold">{{ isEditing ? 'Edit' : 'Add' }}</h3>

        <form @submit.prevent="saveData">
          <div class="space-y-2">
            <div>
              <label class="block mb-1 text-sm font-medium" for="name">Tag Name</label>
              <input
                v-model="currentTag.name"
                id="name"
                type="text"
                class="px-2 py-2 w-full bg-white rounded-lg border border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tag name"
                autocomplete="off"
                autofocus
              />
            </div>
          </div>

          <div class="flex justify-end mt-2 space-x-2">
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

    <!-- 导入弹窗 -->
    <div
      v-if="showImportDialog"
      class="flex fixed inset-0 z-50 justify-center items-center p-2 backdrop-blur-sm bg-black/50"
      @click="closeImportDialog"
    >
      <div
        class="p-4 w-full max-w-sm bg-white rounded-lg transition-all duration-300 transform"
        @click.stop
      >
        <h3 class="mb-2 text-lg font-semibold">Import Tags</h3>

        <form @submit.prevent="importTagsFromJson">
          <div class="space-y-2">
            <div>
              <label class="block mb-1 text-sm font-medium" for="importJson">Tags Data</label>
              <textarea
                v-model="importJson"
                id="importJson"
                rows="4"
                class="px-2 py-2 w-full bg-white rounded-lg border border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste data here"
                autocomplete="off"
                autofocus
              ></textarea>
            </div>
          </div>

          <div class="flex justify-end mt-2 space-x-2">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { copy } from '@/utils/common'

import { getTagsToLocalStorage, saveTagsToLocalStorage, tagColorMap, type Tag } from '@/data/tag'

// 标签列表
const tags = ref<Tag[]>([])

// 初始化 标签列表 数据
onMounted(() => {
  const savedTags = getTagsToLocalStorage()
  tags.value = savedTags
  saveTagsToLocalStorage(tags.value)
})

// 对话框状态
const showDialog = ref(false)
const isEditing = ref(false)

const currentTag = ref<Tag>({
  id: '',
  name: '',
})

const saveButtonDisabled = computed(() => !currentTag.value.name.trim())

// 打开新增对话框
const openAddDialog = () => {
  isEditing.value = false

  currentTag.value = {
    id: '',
    name: '',
  }

  showDialog.value = true
}

// 打开编辑对话框
const openEditDialog = (tag: Tag) => {
  isEditing.value = true

  currentTag.value = { ...tag }

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
    const index = tags.value.findIndex((i) => i.id === currentTag.value.id)
    if (index !== -1) {
      tags.value[index] = { ...currentTag.value }
    }
  } else {
    // 新增
    const newData: Tag = {
      ...currentTag.value,
      id: Math.random().toString(36).substring(2),
    }
    tags.value.push(newData)
  }

  saveTagsToLocalStorage(tags.value)
  closeDialog()
}

// 删除标签
const openDeleteDialog = (tag: Tag) => {
  if (confirm(`Delete this tag: ${tag.name}?`)) {
    tags.value = tags.value.filter((t) => t.id !== tag.id)
    saveTagsToLocalStorage(tags.value)
  }
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
      tags.value = importedData
      saveTagsToLocalStorage(tags.value)
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
