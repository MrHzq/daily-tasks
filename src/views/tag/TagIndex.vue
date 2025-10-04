<template>
  <div class="p-2">
    <!-- 标题和新增按钮 -->
    <div class="flex justify-between items-center mb-6">
      <h2>标签管理</h2>
      <button
        @click="showAddDialog = true"
        class="px-3 py-1 text-white bg-blue-500 rounded-md transition duration-200 hover:bg-blue-600"
      >
        新增
      </button>
    </div>

    <!-- 标签列表 -->
    <div v-if="tags.length > 0" class="space-y-4">
      <div
        v-for="tag in tags"
        :key="tag.id"
        class="flex justify-between items-center p-3 bg-gray-50 rounded-md transition duration-200 hover:bg-gray-100"
      >
        <span class="font-medium text-gray-800">{{ tag.name }}</span>
        <div class="flex space-x-2">
          <button
            @click="handleEdit(tag)"
            class="px-3 py-1 text-sm text-white bg-blue-500 rounded transition duration-200 hover:bg-blue-600"
          >
            编辑
          </button>
          <button
            @click="handleDelete(tag.id)"
            class="px-3 py-1 text-sm text-white bg-red-500 rounded transition duration-200 hover:bg-red-600"
          >
            删除
          </button>
        </div>
      </div>
    </div>

    <!-- 空状态提示 -->
    <div v-else class="py-10 text-center text-gray-500">
      <p>暂无标签，请点击"新增"按钮添加标签</p>
    </div>

    <!-- 新增/编辑标签对话框 -->
    <div
      v-if="showDialog"
      class="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black bg-opacity-50"
    >
      <div class="p-6 w-full max-w-sm bg-white rounded-lg transition-all duration-300 transform">
        <h3 class="mb-4 text-lg font-semibold">{{ isEditing ? '编辑标签' : '新增标签' }}</h3>

        <div class="mb-4">
          <label for="tagName" class="block mb-1 text-sm font-medium text-gray-700">标签名称</label>
          <input
            v-model="currentTagName"
            id="tagName"
            type="text"
            class="px-3 py-2 w-full rounded-md border border-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入标签名称"
            @keyup.enter="saveTag"
          />
        </div>

        <div class="flex justify-end space-x-3">
          <button
            @click="closeDialog"
            class="px-3 py-1 rounded-md border border-gray-300 transition duration-200 hover:bg-gray-50"
          >
            取消
          </button>
          <button
            @click="saveTag"
            :disabled="!currentTagName.trim()"
            class="px-3 py-1 text-white bg-blue-500 rounded-md transition duration-200 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// 定义标签类型
interface Tag {
  id: string
  name: string
}

// 标签列表
const tags = ref<Tag[]>([])

// 对话框状态
const showDialog = ref(false)
const showAddDialog = ref(false)
const isEditing = ref(false)
const currentTagId = ref('')
const currentTagName = ref('')

// 初始化数据
onMounted(() => {
  // 实际项目中这里可能是从API获取数据
  const savedTags = localStorage.getItem('tags')
  if (savedTags) {
    tags.value = JSON.parse(savedTags)
  } else {
    // 初始示例数据
    tags.value = []
    saveTagsToLocalStorage()
  }
})

// 保存标签到本地存储
const saveTagsToLocalStorage = () => {
  localStorage.setItem('tags', JSON.stringify(tags.value))
}

// 打开新增对话框
watch(showAddDialog, (newVal) => {
  if (newVal) {
    isEditing.value = false
    currentTagName.value = ''
    showDialog.value = true
  }
})

// 打开编辑对话框
const handleEdit = (tag: Tag) => {
  isEditing.value = true
  currentTagId.value = tag.id
  currentTagName.value = tag.name
  showDialog.value = true
}

// 关闭对话框
const closeDialog = () => {
  showDialog.value = false
  showAddDialog.value = false
  currentTagName.value = ''
  currentTagId.value = ''
}

// 保存标签（新增或编辑）
const saveTag = () => {
  const tagName = currentTagName.value.trim()
  if (!tagName) return

  if (isEditing.value) {
    // 编辑标签
    const index = tags.value.findIndex((t) => t.id === currentTagId.value)
    if (index !== -1) {
      if (tags.value[index]) tags.value[index].name = tagName
    }
  } else {
    // 新增标签
    const newTag: Tag = {
      id: Date.now().toString(),
      name: tagName,
    }
    tags.value.push(newTag)
  }

  saveTagsToLocalStorage()
  closeDialog()
}

// 删除标签
const handleDelete = (id: string) => {
  if (confirm('确定要删除这个标签吗？')) {
    tags.value = tags.value.filter((tag) => tag.id !== id)
    saveTagsToLocalStorage()
  }
}
</script>
