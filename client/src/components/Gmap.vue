<script setup>
import useMinerStore from "@/stores/Registration/MinerStore";

const {
    coordinates_selector,
    marker_selector,
} = useMinerStore();
</script>

<template>
    <div>
        <GMapMap :center="useMinerStore().center" :zoom="useMinerStore().zoom" map-type-id="terrain"
            style="width: 100%; height: 50vh" @click="marker_selector">
            <GMapMarker v-if="useMinerStore().coordinates.lat !== 0 && useMinerStore().coordinates.lng !== 0"
                :position="useMinerStore().coordinates" />
        </GMapMap>
    </div>
</template>


   