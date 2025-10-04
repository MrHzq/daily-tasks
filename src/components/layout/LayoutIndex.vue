<template>
  <div class="flex overflow-hidden flex-col bg-white">
    <!-- 页面头部 -->
    <LayoutHeader />

    <!-- 页面内容 -->
    <LayoutContent />

    <!-- 页面底部 -->
    <LayoutFooter />
  </div>
</template>
<script setup lang="ts">
import LayoutHeader from './LayoutHeader.vue'
import LayoutContent from './LayoutContent.vue'
import LayoutFooter from './LayoutFooter.vue'
</script>
