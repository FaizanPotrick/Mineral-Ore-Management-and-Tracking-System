<script setup>
import useMineStore from "@/stores/MineStore";
import useAlertStore from "@/stores/Alert";
import useValidationStore from "@/stores/Validation";
import { onMounted, ref } from "vue";
import axios from "axios";
onMounted(async () => {
  const { data } = await axios.get('/api/region_coordinates_and_organisation_list')
  useMineStore().organisations = data.organisations;
  useMineStore().center = [
    data.coordinates.longitude,
    data.coordinates.latitude
  ];
  useMineStore().zoom = 10;
});
const {
  name,
  email_address,
  phone_no,
  aadhar_card,
  pin_code,
  area,
  warehouse_capacity,
  lease_period,
  marker_selector,
  mine_register_fn,
} = useMineStore();

const drawType = ref("Point")
const drawedMarker = ref()
const vectors = ref(null);

const drawstart = (event) => {
  vectors.value.source.removeFeature(drawedMarker.value);
  drawedMarker.value = event.feature;
  console.log(vectors.value.source);
}
</script>
<template>
  <div class="flex justify-center items-center">
    <div class="max-w-4xl w-full p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl text-gray-800">
      <div class="mb-4">
        <div class="font-semibold text-2xl text-yellow-700">
          Mine Registration
        </div>
        <div class="text-gray-500 text-sm">Register a mine.</div>
        <span class="text-red-500 text-center text-sm" v-if="useAlertStore().alert_text.isAlert">{{
            useAlertStore().alert_text.message
        }}</span>
      </div>
      <form class="space-y-5 drop-shadow-md" @submit.prevent="mine_register_fn()">
        <div class="grid gap-6 grid-cols-1">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Organisation ID*</label>
            <input type="text"
              class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              placeholder="Organization ID" v-model="useMineStore().organisation_id" required list="org_id_list" />
            <datalist id="org_id_list">
              <option :value="organisation._id" v-for="organisation of useMineStore().organisations">
                {{ organisation.organisation_name }}</option>
            </datalist>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Manager Name*</label>
            <input type="text"
              class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              placeholder="Manager Name" @change="useValidationStore().validation(name)" v-model="name.value"
              maxlength="150" required />
            <span class="text-center text-sm text-red-500" v-if="!name.valid">Name must be alphabetic</span>
          </div>
        </div>
        <div class="grid gap-6 sm:grid-cols-2">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Manager Email Address*</label>
            <input type="email"
              class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              placeholder="Email Address" @change="useValidationStore().validation(email_address)"
              v-model="email_address.value" maxlength="150" required />
            <span class="text-center text-sm text-red-500" v-if="!email_address.valid">Enter a valid email
              address</span>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Manager Phone No.*</label>
            <input type="text"
              class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              placeholder="Phone Number" @change="useValidationStore().validation(phone_no)" v-model="phone_no.value"
              minlength="10" maxlength="10" required />
            <span class="text-center text-sm text-red-500" v-if="!phone_no.valid">Phone number must be numeric</span>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Manager Aadhar Card*</label>
            <input type="text"
              class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              placeholder="Aadhar Card" @change="useValidationStore().validation(aadhar_card)"
              v-model="aadhar_card.value" minlength="12" maxlength="12" required />
            <span class="text-center text-sm text-red-500" v-if="!aadhar_card.valid">Aadhar card must be numeric</span>
          </div>
        </div>
        <div class="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Pin Code*</label>
            <input type="text" placeholder="Pin Code"
              class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              @change="useValidationStore().validation(pin_code)" v-model="pin_code.value" required />
            <span class="text-center text-sm text-red-500" v-if="!pin_code.valid">Pin Code must be Valid</span>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Area(in sqr.)*</label>
            <input type="number"
              class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              @change="useValidationStore().validation(area)" v-model="area.value" required />
            <span class="text-center text-sm text-red-500" v-if="!area.valid">It must be a positive number</span>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Warehouse Capacity(in mt)*</label>
            <input type="number"
              class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              @change="useValidationStore().validation(warehouse_capacity)" v-model="warehouse_capacity.value"
              required />
            <span class="text-center text-sm text-red-500" v-if="!warehouse_capacity.valid">It must be a positive
              number</span>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Lease Period(in year)*</label>
            <input type="number"
              class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              @change="useValidationStore().validation(lease_period)" v-model="lease_period.value" required />
            <span class="text-center text-sm text-red-500" v-if="!lease_period.valid">It must be a positive
              number</span>
          </div>
        </div>
        <ol-map style="height:40vh">
          <ol-view :center="useMineStore().center" :zoom="useMineStore().zoom" projection="EPSG:4326" />
          <ol-tile-layer>
            <ol-source-osm />
          </ol-tile-layer>
          <ol-zoom-control />
          <ol-vector-layer>
            <ol-mouseposition-control />
            <ol-source-vector ref="vectors">
              <ol-interaction-draw @drawstart="drawstart" :type="drawType">
              </ol-interaction-draw>
            </ol-source-vector>

          </ol-vector-layer>
          <!-- <ol-overlay v-if="
          useMineStore().coordinates.latitude !== 0 && useMineStore().coordinates.longitude !== 0"
            :position="[useMineStore().coordinates.longitude, useMineStore().coordinates.latitude]">
            <img src="@/assets/marker.png" class="h-8 w-8 cursor-pointer" alt="marker">
          </ol-overlay> -->
        </ol-map>
        <div class="space-y-3 py-5">
          <button type="submit" :class="{
            'hover:bg-yellow-600/80': !useValidationStore().isButtonLoading,
          }"
            class="w-full flex text-lg justify-center items-center bg-yellow-600 text-gray-100 p-2.5 rounded-full font-semibold shadow-md"
            :disabled="useValidationStore().isButtonLoading">
            <span v-if="!useValidationStore().isButtonLoading" class="h-6">
              Register
            </span>
            <span v-else>
              <svg class="w-6 h-6 animate-spin text-yellow-600 fill-white" viewBox="0 0 100 101" fill="none">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
