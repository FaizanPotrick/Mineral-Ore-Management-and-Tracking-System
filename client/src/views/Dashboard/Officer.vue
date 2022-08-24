<script setup>
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const route = useRoute();
const title = ref("");
const cards = ref([]);
const markers = ref([]);

const dashboard = async () => {
  const { data } = await axios.get(
    `/api/dashboard/officer/${
      route.params.region_type === undefined &&
      route.params.region_id === undefined
        ? $cookies.get("type_of_region")
        : `${route.params.region_type}?region_id=${route.params.region_id}`
    }`
  );
  title.value = data.title;
  cards.value = data.cards;
  markers.value = data.markers;
};

dashboard();

onBeforeMount(() => {
  dashboard();
});
</script>
<template>
  <div class="flex flex-col gap-2 text-center">
    <div class="text-3xl text-center font-semibold capitalize my-1">
      {{ title }}
    </div>
    <div class="flex gap-4 flex-wrap font-semibold">
      <div
        :key="card"
        v-for="card of cards"
        class="flex flex-col  border-l-4 shadow-2xl border-yellow-300 py-2 px-2 bg-white rounded-3xl rounded-br-3xl border-r-3 drop-shadow-md min-w-[17rem]"
      >
        <div class="text-xl text-center border-b-4 border-yellow-300">{{ card.title }}</div>

        <div class="text-center text-5xl mb-1 my-2">
          <!-- <hr class="border-yellow-300 border-1"> -->
          <div
            v-if="typeof card.value === 'object'"
            v-for="(value, name) of card.value"
          >
            {{ name }} : {{ value }}
          </div>
          <div v-else>{{ card.value }}</div>
        </div>
      </div>
    </div>
    <ol-map style="height: 40vh; width: 65vw" class="my-2">
      <ol-view :center="[78.9629, 20.5937]" :zoom="5" projection="EPSG:4326" />
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
      <ol-zoom-control />
      <ol-overlay
        :key="marker._id"
        v-for="marker of markers"
        :position="marker.coordinates"
      >
        <img
          src="@/assets/marker.png"
          class="h-8 w-8 cursor-pointer"
          alt="marker"
        />
      </ol-overlay>
    </ol-map>
  </div>
</template>
