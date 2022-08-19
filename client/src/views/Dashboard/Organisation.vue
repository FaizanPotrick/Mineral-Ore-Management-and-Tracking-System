<script setup>
import useOrganisationStore from '@/stores/OrganisationStore';
import { useRoute } from 'vue-router';
const route = useRoute();
useOrganisationStore().organisation_dashboard(route);
</script>
<template>
    <div class="flex flex-col gap-8">
        <div class="text-xl font-semibold capitalize">
            {{ useOrganisationStore().company_name }}
        </div>
        <div class="flex gap-4 flex-wrap font-semibold">
            <div :key="card" v-for="card of useOrganisationStore().cards"
                class="flex flex-col gap-2 border-l-4 border-yellow-300 py-5 px-8 bg-white rounded-lg drop-shadow-md min-w-[24rem]">
                <div class="text-xl">{{ card.title }}</div>
                <div class="flex gap-4 capitalize">
                    <div v-if="typeof (card.value) === 'object'" v-for="(value, name) of     card.value">
                        {{ name }} : {{ value }}
                    </div>
                    <div v-else>{{ card.value }}</div>
                </div>
            </div>
        </div>
        <ol-map style="height:40vh">
            <ol-view :center="[78.9629, 20.5937]" :zoom="5" projection="EPSG:4326" />
            <ol-tile-layer>
                <ol-source-osm />
            </ol-tile-layer>
            <ol-zoom-control />
            <ol-overlay :key="marker._id" v-for="marker of useOrganisationStore().markers"
                :position="marker.coordinates">
                <img src="@/assets/marker.png" class="h-8 w-8 cursor-pointer" alt="marker">
            </ol-overlay>
        </ol-map>
    </div>
</template>
