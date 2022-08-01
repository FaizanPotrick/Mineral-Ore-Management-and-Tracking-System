<script setup>
import SidebarVue from "@/components/Sidebar.vue";
import { onBeforeUpdate, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const status = ref('')
const check = async () => {
  const res = await fetch('/api/type_of_user')
  if (res.status !== 200) {
    router.push('/login')
  }
  status.value = res.status
  console.log(res.status)
}
check()
onBeforeUpdate(() => {
  check()
})


</script>
<template>
  <div class="flex bg-yellow-50" v-if="route.meta.type_of_user === $cookies.get('type_of_user')">
    <SidebarVue />
    <RouterView class="m-10 w-full" />
  </div>
  <div v-else>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
</template>
