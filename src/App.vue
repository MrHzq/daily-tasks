<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <main class="flex justify-center items-center flex-col px-[20px] gap-4">
    <div class="text-xl text-sky-500">欢迎使用 random-number-system</div>
    <p class="text-gray-500 text-sm">
      它可以自动生成给定范围内的随机正整数，可用帮你打乱顺序记东西：比如记英语单词~
    </p>
  </main>
  <CusSwitch />
</template>

<script setup lang="ts">
import CusSwitch from './CusSwitch.vue'
</script>

<style scoped></style>
