<template>
  <div
    class="flex flex-col justify-between items-center max-h-screen min-h-screen"
    style="
      background: url(https://media.istockphoto.com/photos/queue-for-loading-picture-id522749832?k=20&m=522749832&s=612x612&w=0&h=U4EWOeTcG-ETZ6f57j8YF5qXJEvANMp2MV32oa_1PT8=);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    "
  >
    <nav
      class="flex justify-center items-center bg-white text-xl font-medium py-1.5 w-full"
    >
      <RouterLink
        to="/"
        class="flex items-center justify-center text-yellow-700 hover:text-yellow-700/80"
      >
        <img src="favicon.png" class="h-12" alt="logo" />
        Ministry Of Mines
      </RouterLink>
    </nav>
    <div class="flex flex-col justify-center items-center font-semibold gap-5">
      <div class="text-white md:text-5xl lg:text-7xl sm:text-3xl uppercase">
        Iron Ore Mining
      </div>
      <RouterLink
        to="/login"
        class="rounded-lg hover:bg-yellow-100 text-yellow-700 text-lg px-8 py-1.5 bg-white"
      >
        Login
      </RouterLink>
    </div>
    <footer class="text-center text-white py-1.5">
      © Ministry of Mines. All Rights Reserved.
    </footer>
  </div>
</template>
