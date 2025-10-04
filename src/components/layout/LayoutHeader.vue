<template>
  <header
    class="flex flex-none justify-between items-center px-4 h-[56px] w-full border-b border-gray-200"
  >
    <div class="left">
      <div class="flex items-center cursor-pointer" @click="handleLogoClick">
        <img src="/favicon.ico" alt="" class="mr-2 w-8 h-8 rounded-full" />
        <p class="text-xl font-bold text-center text-gray-800">Daily Tasks</p>
      </div>
    </div>
    <div class="right">
      <MenuIndex />
    </div>
  </header>
</template>

<script setup lang="ts">
import MenuIndex from '../menu/MenuIndex.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogoClick = () => {
  router.push('/')
}
</script>
