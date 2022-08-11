<script setup>
import axios from 'axios'
let document;
const test = async () => {
  const formData = new FormData();
  formData.append("file", document);
  await axios.post('/api/upload', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
const preview_document = (event) => {
  document = event.target.files[0];
}
</script>
<template>
  <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
    <div class="max-w-5xl p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl sm:10 text-gray-800">
      <form class="space-y-5 drop-shadow-md" @submit.prevent="test">
        <input
          class="w-full content-center text-base border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
          @change="preview_document" type="file" name="file" required />
        <button type="submit" class=" text-green-600 ">
          Approve
        </button>
      </form>
    </div>
  </div>
</template>   