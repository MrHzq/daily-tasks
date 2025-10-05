<template>
  <main class="flex flex-col gap-2 justify-center items-center pt-6 home">
    <div class="text-xl text-sky-500">欢迎使用 Daily Tasks</div>
    <p class="text-sm text-gray-500">它可以用来管理你的每日安排</p>
    <el-button type="primary" @click="handleStartClick">开始使用</el-button>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleStartClick = () => {
  router.push('/daily')
}
</script>
