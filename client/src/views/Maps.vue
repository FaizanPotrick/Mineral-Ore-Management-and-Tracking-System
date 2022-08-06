<template>
    <ol-map style="height:100vh">

        <ol-view ref="view" :center="[40, 40]" :rotation="rotation" :zoom="zoom" :projection="projection" />

        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

        <ol-overlay v-for="marker of [[40, 40], [72.9781, 19.2183]]" :position="marker">
            <template v-slot="slotProps">
                <div class="overlay-content">
                    Hello world!<br>
                    Position: {{ slotProps.position }}
                </div>
            </template>
        </ol-overlay>
    </ol-map>
</template>

<style>
.overlay-content {
    background: #efefef;
    box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
    padding: 10px 20px;
    font-size: 16px;
}
</style>
<script>
import {
    ref
} from 'vue'
export default {
    setup() {
        const center = ref([40, 40])
        const projection = ref('EPSG:4326')
        const zoom = ref(8)
        const rotation = ref(0)

        return {
            center,
            projection,
            zoom,
            rotation
        }
    }

}
</script>