<script setup>
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
</script>
<template>
  <div>
    <HeaderVue />
    <div class="flex flex-col text-center justify-center items-center h-[86vh] font-semibold gap-5" style="
          background:linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .9)), url(https://media.istockphoto.com/photos/queue-for-loading-picture-id522749832?k=20&m=522749832&s=612x612&w=0&h=U4EWOeTcG-ETZ6f57j8YF5qXJEvANMp2MV32oa_1PT8=);
          background-repeat: no-repeat;
          background-size: cover;
          background-attachment: fixed;
          background-position: center;
        ">
      <div class="text-white text-7xl uppercase">
        Iron Ore Mining
      </div>
      <RouterLink to="/login"
        class="border rounded-lg group hover:bg-yellow-200 shadow-md hover:border-yellow-700 text-yellow-700 transition-all ease-in duration-75">
        <div class="px-5 py-1.5 bg-white rounded-lg group-hover:bg-opacity-0 m-0.5">
          Login
        </div>
      </RouterLink>
    </div>
    <FooterVue />
  </div>
</template>
