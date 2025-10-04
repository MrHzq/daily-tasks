<template>
  <Menu as="div" class="inline-block relative z-50 text-left">
    <div>
      <MenuButton
        class="inline-flex justify-center w-full text-sm font-medium rounded-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Menu
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0 transform scale-95"
      enter-to-class="opacity-100 transform scale-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100 transform scale-100"
      leave-to-class="opacity-0 transform scale-95"
    >
      <MenuItems
        class="absolute right-0 mt-1 w-16 bg-white rounded-md divide-y divide-gray-100 ring-1 shadow-lg origin-top-right ring-black/5 focus:outline-none"
      >
        <template v-for="menu in menuList" :key="menu.name">
          <MenuItem v-slot="{ active }" @click="handleMenuItemClick(menu.path)">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full cursor-pointer items-center justify-center px-2 py-2 text-sm',
              ]"
            >
              {{ menu.name }}
            </button>
          </MenuItem>
        </template>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import routes from '@/router/routes'

const menuList = ref(routes.filter((item) => item.name))

import { useRouter } from 'vue-router'

const router = useRouter()

const handleMenuItemClick = (path: string) => {
  router.push(path)
}
</script>
