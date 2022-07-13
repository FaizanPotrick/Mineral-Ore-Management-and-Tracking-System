<script setup>
import AlertBox from '@/components/AlertBox.vue';
</script>

<template>
  <div>
    <header>
      <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
      <!-- <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
    </header>
    <RouterView />
    <AlertBox />
  </div>
</template>