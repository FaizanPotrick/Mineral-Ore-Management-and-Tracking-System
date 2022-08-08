<script setup>
// import useOrganizationStore from "@/stores/Registration/OrganizationStore";
// import useAlertStore from "@/stores/Alert";
// import useValidationStore from "@/stores/Validation";

// const {
//     organization_name,
//     address,
//     ceo_name,
//     ceo_email_address,
//     ceo_phone_no,
//     ceo_aadhar_card,
//     gst_no,
//     register_fn,
// } = useOrganizationStore();
</script>
<template>
  <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
    <div
      class="max-w-5xl p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl sm:10 text-gray-800"
    >
      <form class="space-y-5 drop-shadow-md">
        <div class="grid gap-6 mb-6 grid-cols-1">
          <div class="space-y-2">
            <label class="text-md font-medium text-gray-700">Upload Pdf*</label>
            <input
              class="w-full content-center text-base border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              @change="oresStore.preview_document"
              type="file"
              accept="application/pdf"
              required
            />
          </div>
        </div>

        <div class="grid gap-6 mb-6 grid-cols-2">
          <div class="space-y-3">
            <button
              type="submit"
              class="w-full flex text-lg justify-center items-center bg-green-600 text-gray-100 p-2.5 rounded-full font-semibold shadow-md"
            >
              <span class="h-6"> Approve </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
input[type="file"]::-webkit-file-upload-button,
input[type="file"]::file-selector-button {
  @apply bg-yellow-600 text-white font-medium border-0 py-2 pl-4 pr-4 mr-4;
}
</style>
