<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const router = useRouter();
const route = useRoute();
const title = ref("");
const cards = ref([]);
const markers = ref([]);

const dashboard = async () => {
  const { data } = await axios.get(
    `/api/dashboard/government/${
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
  <div class="flex flex-col gap-8">
    <div class="flex justify-between">
      <div class="text-2xl text-center font-semibold capitalize">
        {{ title }}
      </div>
      <div
        class="flex gap-3"
        v-if="
          route.params.region_type === undefined &&
          route.params.region_id === undefined
        "
      >
        <RouterLink
          v-if="$cookies.get('type_of_region') !== 'district'"
          to="/dashboard/registration/government"
          class="rounded-lg py-1.5 px-4 bg-yellow-300 shadow-md font-semibold"
          >Officer Registration</RouterLink
        >
        <RouterLink
          to="/dashboard/registration/organization"
          class="rounded-lg py-1.5 px-4 bg-yellow-300 shadow-md font-semibold"
          >Organization Registration</RouterLink
        >
        <RouterLink
          v-if="$cookies.get('type_of_region') === 'district'"
          to="/dashboard/registration/mine"
          class="rounded-lg py-1.5 px-4 bg-yellow-300 shadow-md font-semibold"
          >Mine Registration</RouterLink
        >
        <RouterLink
          v-if="$cookies.get('type_of_region') === 'district'"
          to="/dashboard/registration/checkpoint"
          class="rounded-lg py-1.5 px-4 bg-yellow-300 shadow-md font-semibold"
          >Checkpoint Registration</RouterLink
        >
        <RouterLink
          v-if="$cookies.get('type_of_region') === 'district'"
          to="/dashboard/registration/lab"
          class="rounded-lg py-1.5 px-4 bg-yellow-300 shadow-md font-semibold"
          >Lab Registration</RouterLink
        >
      </div>
    </div>
    <div class="flex gap-4 flex-wrap font-semibold">
      <div
        :key="card"
        v-for="card of cards"
        class="flex flex-col gap-2 border-l-4 border-yellow-300 py-5 px-4 bg-white rounded-lg drop-shadow-md min-w-[20rem]"
      >
        <div class="text-xl">{{ card.title }}</div>
        <div class="flex gap-4 capitalize">
          <div
            v-if="typeof card.value === 'object'"
            v-for="(value, name) of card.value"
          >
            {{ name }} : {{ value }}
          </div>
          <div class="text-2xl font-semibold" v-else>{{ card.value }}</div>
        </div>
      </div>
    </div>
    <ol-map style="height: 40vh; width: 92vw" class="my-2">
      <ol-view :center="[78.9629, 20.5937]" :zoom="5" projection="EPSG:4326" />
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
      <ol-zoom-control />
      <ol-overlay
        v-for="marker of markers.mines"
        :key="marker._id"
        :position="marker.coordinates"
      >
        <img
          src="@/assets/mine.png"
          class="h-8 w-8 cursor-pointer"
          alt="marker"
          @click="router.push(`/dashboard/mines/${marker._id}`)"
        />
      </ol-overlay>
      <ol-overlay
        v-for="marker of markers.check_points"
        :key="marker._id"
        :position="marker.coordinates"
      >
        <img
          src="@/assets/checkpoint.png"
          class="h-8 w-8 cursor-pointer"
          alt="marker"
          @click="router.push(`/dashboard/checkpoints/${marker._id}`)"
        />
      </ol-overlay>
      <ol-overlay
        v-for="marker of markers.labs"
        :key="marker._id"
        :position="marker.coordinates"
      >
        <img
          src="@/assets/lab.png"
          class="h-8 w-8 cursor-pointer"
          alt="marker"
          @click="router.push(`/dashboard/labs/${marker._id}`)"
        />
      </ol-overlay>
      <ol-overlay
        v-if="
          $cookies.get('type_of_region') !== 'district' &&
          $cookies.get('type_of_region')
        "
        v-for="marker of markers.officers"
        :key="marker._id"
        :position="marker.coordinates"
      >
        <a
          :href="`/dashboard/governments/${marker.type_of_region}/${marker._id}`"
        >
          <img
            src="@/assets/officer.png"
            class="h-8 w-8 cursor-pointer"
            alt="marker"
        /></a>
      </ol-overlay>
    </ol-map>
  </div>
</template>
