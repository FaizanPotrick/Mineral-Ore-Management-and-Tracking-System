<script setup>
import SidebarVue from "@/components/Sidebar.vue";
</script>
<template>
  <div class="flex bg-yellow-50">
    <SidebarVue />
    <RouterView class="m-10 w-full" />
  </div>
</template>
