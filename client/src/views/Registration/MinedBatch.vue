<script setup>
import useAlertStore from '@/stores/Alert';
import useMinedBatchStore from '@/stores/MinedBatchStore';
import useValidationStore from '@/stores/Validation';
const {
  store_image, store_document, ores_register_fn } = useMinedBatchStore()

</script>
<template>
  <div class="flex justify-center items-center">
    <div class="max-w-lg p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl m-5 sm:10 text-gray-800">
      <div class="mb-4">
        <div class="font-semibold text-2xl text-yellow-700">Ores
          Registration</div>
        <div class="text-gray-500 text-sm">Register a Batch</div>
        <span class="text-red-500 text-center text-sm" v-if="useAlertStore().alert_text.isAlert">{{
            useAlertStore().alert_text.message
        }}</span>
      </div>
      <form class="space-y-5 drop-shadow-md" @submit.prevent="ores_register_fn()" enctype="multipart/form-data">
        <div class="grid gap-6 mb-6 sm:grid-cols-2">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Type*</label>
            <select
              class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              v-model="useMinedBatchStore().type_of_ore" required>
              <option disabled value="" selected>Select the Type</option>
              <option value="lump">Lump</option>
              <option value="fine">Fine</option>
              <option value="iron_pellet">Iron Pellet</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Grade(Fe%)*</label>
            <input
              class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              v-model="useMinedBatchStore().fe_percentage" type="number" required>
          </div>
        </div>
        <div class="grid gap-6 mb-6 grid-cols-1">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Quantity(in mt)*</label>
            <input
              class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              v-model="useMinedBatchStore().quantity" type="number" required>

          </div>
        </div>
        <div class="grid gap-6 mb-6 grid-cols-2">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Sample Image*</label>
            <input
              class="w-full content-center text-base border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              @change="store_image" type="file" accept="image/*" required>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Upload
              Pdf*</label>
            <input
              class="w-full content-center text-base border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              @change="store_document" type="file" accept="application/pdf" required>
          </div>
        </div>
        <div class="space-y-3 py-5">
          <button type="submit" :class="{
            'hover:bg-yellow-600/80': !useValidationStore().isButtonLoading,
          }"
            class="w-full flex text-lg justify-center items-center bg-yellow-600 text-gray-100 p-2.5 rounded-full font-semibold shadow-md"
            :disabled="useValidationStore().isButtonLoading">
            <span v-if="!useValidationStore().isButtonLoading" class="h-6">
              Create Batch
            </span>
            <span v-else>
              <svg class="w-6 h-6 animate-spin text-yellow-600 fill-white" viewBox="0 0 100 101" fill="none">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
input[type=file]::-webkit-file-upload-button,
input[type=file]::file-selector-button {
  @apply bg-yellow-600 text-white font-medium border-0 py-2 pl-4 pr-4 mr-4;
}
</style>