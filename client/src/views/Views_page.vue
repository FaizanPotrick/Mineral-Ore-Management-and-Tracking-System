<script setup>
import Miner from "../stores/Json_files/miner.json";

console.log(Miner);
</script>
<template>
  <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
    <div
      class="max-w-5xl p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl sm:10 text-gray-800"
    >
      <div class="mb-4">
        <div class="font-semibold text-2xl text-yellow-700">
          Officer Checking
        </div>
        <div class="text-gray-500 text-md">Miner details.</div>
      </div>
      <div class="flex flex-col gap-6 justify-center">
        <div class="max-width-400">
          <h3 class="font-medium text-black">Sample image</h3>
          <img
            src="https://www.mining-journal.com/w-images/f7275431-73cc-4a9f-aeb8-d55f198e98bb/3/IronOreSamples-450x400.jpg"
            alt="sample_image"
          />
        </div>
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="flex flex-wrap justify-center">
            <p class="px-6 py-4">Batch Id:{{ Miner[0].batch_id }}</p>
            <p class="px-6 py-4">Manager Id: {{ Miner[0].manager_id }}</p>
          </div>
          <div class="flex flex-wrap justify-center">
            <p class="px-6 py-4">Officer Id:{{ Miner[0].officer_id }}</p>
            <p class="px-6 py-4">Mine Id:{{ Miner[0].mine_id }}</p>
          </div>

          <div class="flex flex-wrap justify-center">
            <p class="px-6 py-4">Grade:{{ Miner[0].grade }}</p>
            <p class="px-6 py-4">Fe Percentage:{{ Miner[0].fe_percent }}</p>
          </div>

          <div class="flex flex-wrap justify-center">
            <p class="px-6 py-4">Type of Ore:{{ Miner[0].type_of_ore }}</p>
            <p class="px-6 py-4">Quantity:{{ Miner[0].quantity }}</p>
          </div>

          <div class="flex flex-wrap justify-center">
            <p class="px-6 py-4">Status:{{ Miner[0].status }}</p>
            <p class="px-6 py-4">Timestamp:{{ Miner[0].time_stamp }}</p>
          </div>
        </div>
      </div>
      <button
        class="bg-orange-600 hover:bg-grey text- font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download</span>
      </button>
    </div>

    <!-- <form class="space-y-5 drop-shadow-md">
                <div class="grid gap-6 mb-6 grid-cols-1">
                    <div class="space-y-2">
                        <label class="text-md font-medium text-gray-700">Upload
                            Pdf*</label>
                        <input
                            class="w-full content-center text-base border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                            @change="oresStore.preview_document" type="file" accept="application/pdf" required>
                    </div>
                </div>
            </form> -->
  </div>
</template>
<style>
input[type="file"]::-webkit-file-upload-button,
input[type="file"]::file-selector-button {
  @apply bg-yellow-600 text-white font-medium border-0 py-2 pl-4 pr-4 mr-4;
}
</style>
