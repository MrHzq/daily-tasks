<template>
  <div class="flex overflow-hidden flex-col bg-white">
    <!-- 页面头部 -->
    <header
      class="flex flex-none justify-between items-center px-4 h-[56px] w-full border-b border-gray-200"
    >
      <div class="left">
        <div class="flex items-center cursor-pointer" @click="handleLogoClick">
          <img src="/favicon.ico" alt="" class="mr-2 w-8 h-8 rounded-full" />
          <p class="text-xl font-bold text-center text-gray-800">Daily Tasks</p>
        </div>
      </div>
    </header>

    <!-- 页面内容 -->
    <div class="overflow-hidden flex-1 w-full">
      <router-view class="h-full"></router-view>
    </div>

    <!-- 页面底部 -->
    <footer
      class="flex justify-center items-center flex-none px-4 h-[56px] w-full border-t border-gray-200"
    >
      <div class="text-sm text-center text-gray-500">
        <p>Daily Tasks &copy; 2025</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogoClick = () => {
  router.push('/')
}
</script>

<style scoped></style>
