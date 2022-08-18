<script setup>
import useMinedBatchStore from "@/stores/MinedBatchStore";
useMinedBatchStore().get_mines();
</script>
<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Mines</div>
        <input
          type="search"
          class="max-w-sm w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Search"
        />
      </div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="border-b whitespace-nowrap bg-yellow-400">
            <tr class="text-center">
              <th class="px-6 py-4">Batch Id</th>
              <th
                class="px-6 py-4"
                v-if="$cookies.get('type_of_user') === 'officer'"
              >
                Manager Id
              </th>
              <th class="px-6 py-4">Grade</th>
              <th class="px-6 py-4">Fe Percentage</th>
              <th class="px-6 py-4">Type of Ore</th>
              <th class="px-6 py-4">Quantity</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Timestamp</th>
              <th class="px-6 py-4">View</th>
            </tr>
          </thead>
          <tbody class="font-normal text-gray-600 whitespace-nowrap">
            <tr
              :key="mine._id"
              v-for="mine in useMinedBatchStore().mines"
              class="text-center"
            >
              <td class="px-6 py-4">
                {{ mine._id }}
              </td>
              <td
                class="px-6 py-4"
                v-if="$cookies.get('type_of_user') === 'officer'"
              >
                {{ mine.manager_id }}
              </td>
              <td class="px-6 py-4">
                {{ mine.grade }}
              </td>
              <td class="px-6 py-4">
                {{ mine.fe_percentage }}
              </td>
              <td class="px-6 py-4">
                {{ mine.type_of_ore }}
              </td>
              <td class="px-6 py-4">
                {{ mine.quantity }}
              </td>
              <td class="px-6 py-4">
                {{ mine.status }}
              </td>
              <td class="px-6 py-4">
                {{ mine.createdAt }}
              </td>
              <td class="px-6 py-4">
                <RouterLink
                  :to="'/dashboard/mines/' + mine._id"
                  class="hover:text-yellow-700"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    ></path>
                  </svg>
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
