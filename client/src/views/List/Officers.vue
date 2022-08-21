<script setup>
import axios from "axios";
import { ref } from "vue";

const officers = ref([]);
const filteredOfficers = ref([]);
const search = ref("");
const get_officers = async () => {
  const { data } = await axios.get(
    `/api/officers/officer/${$cookies.get("type_of_region")}`
  );
  officers.value = data;
  filteredOfficers.value = data;
};
get_officers();

const searchList = () => {
  const data = filteredOfficers.value.filter((item) => {
    if (search.value === "") {
      return filteredOfficers.value;
    }
    else if (item._id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.officer_id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.type_of_region.toLowerCase().includes(search.value.toLowerCase())) {
      return true;
    }
    else if (item.state.toLowerCase().includes(search.value.toLowerCase()))
      return true;
  });

  officers.value = data;
};
</script>
<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md">
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Officers</div>
        <div class="hidden sm:block">
          <input type="search" class="w-10vw px-4 py-2 border border-gray-300 rounded-lg" placeholder="Search"
            v-model="search" @keyup.enter="searchList()" />
          <button type="submit" @click="searchList()"
            class="absolute top-18 right-5 p-2.5 text-sm font-medium text-white bg-yellow-500 rounded-r-lg border border-yellow-600 hover:bg-orange-400">
            <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="border-b whitespace-nowrap bg-yellow-400">
            <tr class="text-center">
              <th class="px-1 py-4">Region Id</th>
              <th class="px-1 py-4">Officer Id</th>
              <th class="px-1 py-4">Region Type</th>
              <th class="px-1 py-4">State</th>
              <th class="px-1 py-4">District</th>
              <th class="px-1 py-4"></th>
            </tr>
          </thead>
          <tbody class="font-normal text-gray-600 whitespace-nowrap">
            <tr :key="officer._id" v-for="officer in officers" class="text-center">
              <abbr style="text-decoration: none" :title="officer._id">
                <td class="px-1 py-4">...{{ officer._id.slice(19) }}</td>
              </abbr>
              <td class="px-1 py-4">
                {{ officer.officer_id.slice(4) }}
              </td>
              <td class="px-1 py-4 capitalize">
                {{ officer.type_of_region }}
              </td>
              <td class="px-1 py-4 capitalize">
                {{ officer.state }}
              </td>
              <td class="px-1 py-4 capitalize">
                {{
                    officer.type_of_region === "state" ? "-" : officer.district
                }}
              </td>
              <td class="px-1 py-4">
                <RouterLink :to="
                  '/dashboard/officers/' +
                  officer.type_of_region +
                  '/' +
                  officer._id
                " class="hover:text-yellow-700">
                  <!-- <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    ></path>
                  </svg> -->
                  <button type="button"
                    class="inline-block px-4 py-2  border-2 bg-blue-600 hover:bg-blue-800 text-white font-medium text-xs leading-normal uppercase rounded-lg">
                    View
                  </button>
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
