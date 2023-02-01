<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useAlertStore from "@/stores/Alert";

const { open_alert_box } = useAlertStore();
const regions = ref([]);
const officer = ref({
  name: "",
  email_address: "",
  type_of_region:
    $cookies.get("type_of_region") === "country" ? "state" : "district",
  region: "",
});
const loading = ref(false);

const register_fn = async () => {
  loading.value = true;
  try {
    await axios.post("/api/registration/government", officer.value);
    officer.value = {
      name: "",
      email_address: "",
      type_of_region:
        $cookies.get("type_of_region") === "country" ? "state" : "district",
      region: "",
    };
  } catch (err) {
    open_alert_box(err.response.data.message, err.response.data.type);
  }
  loading.value = false;
};

onMounted(async () => {
  const { data } = await axios.get(
    `/api/region/${$cookies.get("type_of_region")}`
  );
  regions.value = data;
});
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      class="max-w-xl w-full p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl text-gray-800"
    >
      <div class="mb-4">
        <div class="font-semibold text-2xl text-yellow-700">
          Officer Registration
        </div>
        <div class="text-gray-500 text-sm">
          Register an
          {{
            $cookies.get("type_of_region") === "country" ? "state" : "district"
          }}
          officer.
        </div>
      </div>
      <form class="space-y-5 drop-shadow-md" @submit.prevent="register_fn()">
        <input
          type="text"
          class="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:border-yellow-600/40"
          placeholder="Officer Name"
          v-model="officer.name"
          required
        />
        <div class="grid gap-6 sm:grid-cols-2">
          <input
            type="email"
            class="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:border-yellow-600/40"
            placeholder="Email Address"
            v-model="officer.email_address"
            maxlength="150"
            pattern="[a-z0-9._]+@[a-z0-9]+\.[a-z]+"
            required
          />
          <select
            class="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:border-yellow-600/40 capitalize"
            :disabled="regions.length === 0"
            v-model="officer.region"
            required
          >
            <option disabled selected value="">
              Choose a
              {{
                $cookies.get("type_of_region") === "country"
                  ? "State"
                  : "District"
              }}
            </option>
            <option
              class="capitalize text-slate-900"
              v-for="region of regions"
              :value="region"
            >
              {{ region }}
            </option>
          </select>
        </div>
        <button
          type="submit"
          :class="{
            'hover:bg-yellow-600/80': !loading.value,
          }"
          class="w-full flex text-lg justify-center items-center bg-yellow-600 text-white px-3 py-1.5 rounded-lg shadow-md"
          :disabled="loading"
        >
          <span v-if="!loading" class="h-6"> Register </span>
          <span v-else>
            <svg
              class="w-6 h-6 animate-spin text-yellow-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </span>
        </button>
      </form>
    </div>
  </div>
</template>
