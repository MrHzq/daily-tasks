<template>
  <div class="flex overflow-hidden flex-col bg-white">
    <!-- 内容 -->
    <div class="overflow-hidden flex-1 w-full">
      <router-view class="h-full"></router-view>
    </div>

    <!-- 页脚 -->
    <footer class="flex-none px-4 py-6 w-full shadow-inner">
      <div class="text-sm text-center text-gray-500">
        <p>Daily Tasks &copy; 2025</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
