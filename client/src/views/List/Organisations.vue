<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const filter_organisations = ref([]);
const search = ref("");
const organisations = ref([]);

const get_organisations = async () => {
  const { data } = await axios.get("/api/organisations/officer");
  organisations.value = data;
  filter_organisations.value = data;
};
get_organisations();

const searchList = () => {
  const data = filter_organisations.value.filter((item) => {
    if (search.value === "") {
      return filter_organisations.value;
    } else if (item._id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (
      item.organisation_name.toLowerCase().includes(search.value.toLowerCase())
    )
      return true;
    else if (item.ceo_id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.gst_no.toLowerCase().includes(search.value.toLowerCase()))
      return true;
  });

  organisations.value = data;
};
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Organisations</div>
        <div class="hidden sm:block">
          <input
            type="search"
            class="max-w-sm w-8vw px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Search"
            v-model="search"
            @keyup.enter="searchList()"
          />
          <button
            type="submit"
            @click="searchList()"
            class="absolute top-18 right-5 p-2.5 text-sm font-medium text-white bg-yellow-500 rounded-r-lg border border-yellow-600 hover:bg-orange-400"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="border-b whitespace-nowrap bg-yellow-400">
            <tr>
              <th class="py-4">Organisation Id</th>
              <th class="py-4">Organisation Name</th>
              <th class="py-4">CEO Id</th>
              <th class="py-4">GST No</th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              :key="organisation._id"
              v-for="organisation in organisations"
              class="text-center hover:bg-yellow-100/20 cursor-pointer"
              @click="
                router.push(`/dashboard/organisations/${organisation._id}`)
              "
            >
              <td class="block py-4">
                <abbr
                  class="md:hidden"
                  style="text-decoration: none"
                  :title="organisation._id"
                >
                  ...{{ organisation._id.slice(19) }}
                </abbr>
                <abbr
                  class="hidden md:block"
                  style="text-decoration: none"
                  :title="organisation._id"
                >
                  {{ organisation._id }}
                </abbr>
              </td>
              <td class="py-4 capitalize">
                {{ organisation.organisation_name }}
              </td>
              <td class="py-4">
                {{ organisation.ceo_id }}
              </td>
              <td class="py-4">{{ organisation.gst_no }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
