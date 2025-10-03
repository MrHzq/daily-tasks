<template>
  <div class="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
    <!-- 页面头部 -->
    <header class="px-4 py-6 bg-white shadow-sm dark:bg-gray-800 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">每日日程安排</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">平衡工作与生活的时间管理表</p>

        <!-- 主题切换按钮 -->
        <button
          @click="toggleTheme"
          class="p-2 mt-4 bg-gray-200 rounded-full transition-colors dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          aria-label="切换主题"
        >
          <i class="text-gray-700 fa fa-moon-o dark:hidden"></i>
          <i class="hidden text-yellow-400 fa fa-sun-o dark:inline"></i>
        </button>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <!-- 日程表容器 -->
      <div class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <!-- 日程表标题行 -->
        <div
          class="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-y-0 md:divide-x dark:divide-gray-700"
        >
          <div class="px-6 py-4 text-center">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">工作日</h2>
            <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div class="flex items-center">
                <span class="inline-block mr-2 w-3 h-3 bg-purple-500 rounded-full"></span>
                <span class="text-gray-600 dark:text-gray-300">睡觉: 9h</span>
              </div>
              <div class="flex items-center">
                <span class="inline-block mr-2 w-3 h-3 bg-amber-500 rounded-full"></span>
                <span class="text-gray-600 dark:text-gray-300">上班: 7h</span>
              </div>
              <div class="flex items-center">
                <span class="inline-block mr-2 w-3 h-3 bg-green-500 rounded-full"></span>
                <span class="text-gray-600 dark:text-gray-300">吃饭: 2h</span>
              </div>
              <div class="flex items-center">
                <span class="inline-block mr-2 w-3 h-3 bg-blue-500 rounded-full"></span>
                <span class="text-gray-600 dark:text-gray-300">自由: 6h</span>
              </div>
            </div>
          </div>

          <div class="px-6 py-4 text-center">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">节假日</h2>
            <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div class="flex items-center">
                <span class="inline-block mr-2 w-3 h-3 bg-purple-500 rounded-full"></span>
                <span class="text-gray-600 dark:text-gray-300">睡觉: 9h</span>
              </div>
              <div class="flex items-center">
                <span class="inline-block mr-2 w-3 h-3 bg-amber-500 rounded-full"></span>
                <span class="text-gray-600 dark:text-gray-300">上班: 0h</span>
              </div>
              <div class="flex items-center">
                <span class="inline-block mr-2 w-3 h-3 bg-green-500 rounded-full"></span>
                <span class="text-gray-600 dark:text-gray-300">吃饭: 2h</span>
              </div>
              <div class="flex items-center">
                <span class="inline-block mr-2 w-3 h-3 bg-blue-500 rounded-full"></span>
                <span class="text-gray-600 dark:text-gray-300">自由: 13h</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 日程表内容 -->
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <!-- 睡眠时间 -->
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div
              class="p-4 border-b border-gray-200 md:border-b-0 md:border-r dark:border-gray-700"
            >
              <div
                class="p-4 bg-purple-50 rounded-lg border border-purple-100 dark:border-purple-900"
              >
                <div class="font-medium text-purple-800 dark:text-purple-300">23:00~08:00</div>
                <div class="mt-1 text-gray-800 dark:text-gray-200">睡觉、起床</div>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">9小时</div>
              </div>
            </div>

            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div
                class="p-4 bg-purple-50 rounded-lg border border-purple-100 dark:border-purple-900"
              >
                <div class="font-medium text-purple-800 dark:text-purple-300">23:00~08:00</div>
                <div class="mt-1 text-gray-800 dark:text-gray-200">睡觉、起床</div>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">9小时</div>
              </div>
            </div>
          </div>

          <!-- 洗漱学习时间 -->
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div
              class="p-4 border-b border-gray-200 md:border-b-0 md:border-r dark:border-gray-700"
            >
              <div class="p-4 bg-green-50 rounded-lg border border-green-100 dark:border-green-900">
                <div class="font-medium text-green-800 dark:text-green-300">08:00~09:25</div>
                <div class="mt-1 text-gray-800 dark:text-gray-200">洗漱、学英语</div>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">1.5小时</div>
              </div>
            </div>

            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="p-4 bg-green-50 rounded-lg border border-green-100 dark:border-green-900">
                <div class="font-medium text-green-800 dark:text-green-300">08:00~09:25</div>
                <div class="mt-1 text-gray-800 dark:text-gray-200">洗漱、学英语</div>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">1.5小时</div>
              </div>
            </div>
          </div>

          <!-- 上午时间 -->
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div
              class="p-4 border-b border-gray-200 md:border-b-0 md:border-r dark:border-gray-700"
            >
              <div class="p-4 bg-amber-50 rounded-lg border border-amber-100 dark:border-amber-900">
                <div class="font-medium text-amber-800 dark:text-amber-300">09:25~12:00</div>
                <div class="mt-1 text-gray-800 dark:text-gray-200">早餐、上班</div>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">2.5小时</div>
              </div>
            </div>

            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="p-4 bg-blue-50 rounded-lg border border-blue-100 dark:border-blue-900">
                <div class="font-medium text-blue-800 dark:text-blue-300">09:25~12:00</div>
                <div class="mt-1 text-gray-800 dark:text-gray-200">早餐、??</div>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">2.5小时</div>
              </div>
            </div>
          </div>

          <!-- 午休时间 -->
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="p-4 bg-green-50 rounded-lg border border-green-100 dark:border-green-900">
              <div class="font-medium text-green-800 dark:text-green-300">12:00~13:30</div>
              <div class="mt-1 text-gray-800 dark:text-gray-200">午饭、午休</div>
              <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">1.5小时</div>
            </div>
          </div>

          <!-- 下午时间 -->
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div
              class="p-4 border-b border-gray-200 md:border-b-0 md:border-r dark:border-gray-700"
            >
              <div class="p-4 bg-amber-50 rounded-lg border border-amber-100 dark:border-amber-900">
                <div class="font-medium text-amber-800 dark:text-amber-300">13:30~17:00</div>
                <div class="mt-1 text-gray-800 dark:text-gray-200">下午上班</div>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">3.5小时</div>
              </div>
            </div>

            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="p-4 bg-blue-50 rounded-lg border border-blue-100 dark:border-blue-900">
                <div class="font-medium text-blue-800 dark:text-blue-300">13:30~17:00</div>
                <div class="mt-1 text-gray-800 dark:text-gray-200">??</div>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">3.5小时</div>
              </div>
            </div>
          </div>

          <!-- 晚餐时间 -->
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="p-4 bg-green-50 rounded-lg border border-green-100 dark:border-green-900">
              <div class="font-medium text-green-800 dark:text-green-300">17:00~17:30</div>
              <div class="mt-1 text-gray-800 dark:text-gray-200">晚餐</div>
              <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">0.5小时</div>
            </div>
          </div>

          <!-- 傍晚时间 -->
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div
              class="p-4 border-b border-gray-200 md:border-b-0 md:border-r dark:border-gray-700"
            >
              <div class="p-4 bg-amber-50 rounded-lg border border-amber-100 dark:border-amber-900">
                <div class="font-medium text-amber-800 dark:text-amber-300">17:30~18:30</div>
                <div class="mt-1 text-gray-800 dark:text-gray-200">下午上班</div>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">1小时</div>
              </div>
            </div>

            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="p-4 bg-blue-50 rounded-lg border border-blue-100 dark:border-blue-900">
                <div class="font-medium text-blue-800 dark:text-blue-300">17:30~18:30</div>
                <div class="mt-1 text-gray-800 dark:text-gray-200">阅读</div>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">1小时</div>
              </div>
            </div>
          </div>

          <!-- 晚上时间 -->
          <div class="p-4">
            <div class="p-4 bg-blue-50 rounded-lg border border-blue-100 dark:border-blue-900">
              <div class="font-medium text-blue-800 dark:text-blue-300">18:30~23:00</div>
              <div class="mt-1 text-gray-800 dark:text-gray-200">
                <ul class="space-y-1 list-disc list-inside">
                  <li>写一篇《认知觉醒》</li>
                  <li>推进《壹人成》进度</li>
                  <li>健身、脚上八锦缎</li>
                  <li>做些其他的事情……</li>
                </ul>
              </div>
              <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">4.5小时</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 可编辑提示 -->
      <div
        class="p-4 mt-8 bg-blue-50 rounded-lg border border-blue-100 dark:bg-blue-900/30 dark:border-blue-800"
      >
        <h3 class="flex items-center font-medium text-blue-800 dark:text-blue-300">
          <i class="mr-2 fa fa-pencil"></i> 编辑日程
        </h3>
        <p class="mt-2 text-gray-700 dark:text-gray-300">
          点击任意时间段可以编辑内容，自定义你的日程安排。
        </p>
        <button
          class="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700"
        >
          保存我的日程
        </button>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="px-4 py-6 mt-12 bg-white shadow-inner dark:bg-gray-800">
      <div class="mx-auto max-w-7xl text-sm text-center text-gray-500 dark:text-gray-400">
        <p>时间管理日程表 &copy; 2023</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 主题切换功能
const isDarkMode = ref(false)

// 检查用户偏好的主题
onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    enableDarkMode()
  } else {
    disableDarkMode()
  }
})

// 切换主题
const toggleTheme = () => {
  if (isDarkMode.value) {
    disableDarkMode()
  } else {
    enableDarkMode()
  }
}

// 启用暗色模式
const enableDarkMode = () => {
  document.documentElement.classList.add('dark')
  isDarkMode.value = true
  localStorage.setItem('theme', 'dark')
}

// 禁用暗色模式
const disableDarkMode = () => {
  document.documentElement.classList.remove('dark')
  isDarkMode.value = false
  localStorage.setItem('theme', 'light')
}
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

/* 日程项悬停效果 */
div[class*='bg-'] {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

div[class*='bg-']:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
