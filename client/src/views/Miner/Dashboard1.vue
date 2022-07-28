<template>
  <div class="flex items-start justify-center min-h-screen">
    <section class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <!-- CARD 1 -->
      <div
        class="border-l-4 border-l-yellow-300 relative p-5 bg-white text-black rounded-md overflow-hidden"
      >
        <div class="relative z-10 mb-4 text-xl leading-none font-semibold">
          500 Metric Tons
        </div>
        <div class="relative z-10 text-black leading-none font-semibold">
          Iron ore available
        </div>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-yellow-300 opacity-50"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <!-- END OF CARD1 -->

      <!-- CARD 2 -->
      <div
        class="border-l-4 border-l-blue-300 relative p-5 bg-white rounded-md overflow-hidden"
      >
        <div
          class="relative z-10 mb-4 text-black text-xl leading-none font-semibold"
        >
          40 Metric Tons
        </div>
        <div class="relative z-10 text-black leading-none font-semibold">
          Average Per iron
          <br />
          ore mine per day
        </div>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-blue-300 opacity-50"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <!-- END OF CARD2 -->

      <!-- CARD3 -->
      <div
        class="border-l-4 border-l-red-300 relative p-5 bg-white rounded-md overflow-hidden"
      >
        <div
          class="relative z-10 mb-4 text-black text-4xl leading-none font-semibold"
        >
          50%
        </div>
        <div class="relative z-10 text-black leading-none font-semibold">
          Warehouse Capacity
        </div>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-red-700 opacity-50"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <!-- END OF CARD3 -->

      <!-- CARD4 -->
      <div
        class="border-l-4 border-l-green-300 relative p-5 bg-white rounded-md overflow-hidden"
      >
        <div class="mb-4 text-black text-xl leading-none font-semibold">
          950000
        </div>
        <div class="text-black leading-none font-semibold">
          Number Of Visitors
        </div>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-green-700 opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </svg>
      </div>

      <div class="bg-white p-4">
        <DoughnutChart />
      </div>
      <div class="bg-white p-4">
        <BarChart />
      </div>
    </section>
  </div>
</template>

<!-- Chart doughnut -->

<script>
import DoughnutChart from "../../components/Doughnut.ts";
import BarChart from "../../components/BarChart.ts";

export default {
  name: "App",
  components: {
    DoughnutChart,
    BarChart,
  },
};
</script>

<!-- End of Bar Chart -->
