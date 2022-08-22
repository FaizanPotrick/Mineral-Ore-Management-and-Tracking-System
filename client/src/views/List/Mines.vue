<script setup>
import axios from "axios";
import { ref } from "vue";

const mines = ref([]);
const filter_mines = ref([]);
const search = ref("");
const get_mines = async () => {
  const { data } = await axios.get(
    `/api/mines/${$cookies.get("type_of_user") === "officer"
      ? `officer/${$cookies.get("type_of_region")}`
      : "organisation"
    }`
  );
  mines.value = data;
  filter_mines.value = data;
};
get_mines();

const searchList = () => {
  const data = filter_mines.value.filter((item) => {
    if (search.value === "") {
      return filter_mines.value;
    } else if (
      item._id.toLowerCase().includes(search.value.toLowerCase())
    )
      return true;
    else if (item.organisation_id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.manager_id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.region_id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.warehouse_capacity.toString().includes(search.value))
      return true;
    else if (item.location.pin_code.toString().includes(search.value)) return true;
  });

  mines.value = data;
};
</script>
<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md">
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Mines</div>
        <div class="hidden sm:block">
          <input type="search" class="max-w-sm w-8vw px-4 py-2 border border-gray-300 rounded-lg" placeholder="Search"
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
              <th class="px-2 py-4">Mine Id</th>
              <th class="px-2 py-4">Manager Id</th>
              <th v-if="$cookies.get('type_of_user') === 'officer'" class="px-6 py-4">
                Organisation Id
              </th>
              <th class="px-2 py-4">Region Id</th>
              <th class="px-2 py-4">Warehouse Capacity</th>
              <th class="px-2 py-4">Pin Code</th>
              <th class="px-2 py-4">Lease Expiry</th>
              <th class="px-2 py-4"></th>
            </tr>
          </thead>
          <tbody class="font-normal text-gray-600 whitespace-nowrap">
            <tr :key="mine._id" v-for="mine in mines" class="text-center">
              <td class="py-4">
                <abbr style="text-decoration: none" :title="mine._id">
                  ...{{ mine._id.slice(19) }}
                </abbr>
              </td>
              <td class="py-4">
                {{ mine.manager_id }}
              </td>
              <td class="py-4" v-if="$cookies.get('type_of_user') === 'officer'">
                <abbr style="text-decoration: none" :title="mine.organisation_id">
                  ...{{ mine.organisation_id.slice(12) }}
                </abbr>
              </td>
              <td class="py-4">
                <abbr style="text-decoration: none" :title="mine.region_id">
                  ...{{ mine.region_id.slice(12) }}
                </abbr>
              </td>
              <td class="py-4">
                {{ mine.warehouse_capacity }}
              </td>
              <td class="py-4">
                {{ mine.location.pin_code }}
              </td>
              <td class="py-4">
                {{ mine.lease_period.to }}
              </td>
              <td class="py-4">
                <RouterLink :to="'/dashboard/mines/' + mine._id" class="hover:text-yellow-700">
                  <!-- <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    ></path>
                  </svg> -->
                  <button type="button"
                    class="inline-block px-4 py-2 border-2 bg-yellow-500 hover:bg-yellow-400 text-white font-medium text-xs leading-normal uppercase rounded-lg">
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
