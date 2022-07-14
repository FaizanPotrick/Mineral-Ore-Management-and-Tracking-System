<script setup>
import { useAlertStore } from '@/stores/Alert';
import { useOresStore } from '@/stores/Miner/Ores';
import { useValidationStore } from '@/stores/Validation';
const oresStore = useOresStore();
const alertStore = useAlertStore();
const validationStore = useValidationStore();
</script>
<template>
    <div class="flex justify-center items-center min-h-screen">
        <div
            class="max-w-lg p-10 border border-orange-300 drop-shadow-md shadow-lg shadow-orange-300/80 rounded-2xl m-5 sm:10">
            <div class="mb-4">
                <div class="font-semibold text-2xl text-gray-800">Ore Details</div>
                <div class="text-gray-500">Please fill ores details</div>
                <span
                    :class="{ 'text-red-500': alertStore.alert_text.type === 'error', 'text-green-500': alertStore.alert_text.type === 'success', 'text-blue-500': alertStore.alert_text.type === 'info', 'text-yellow-500': alertStore.alert_text.type === 'warning' }"
                    class="text-center text-sm"
                    v-if="alertStore.alert_text.message && !alertStore.alert_text.alertbox">{{
                            alertStore.alert_text.message
                    }}</span>
            </div>
            <form class="space-y-5" @submit.prevent="oresStore.oresRegistration()">
                <div class="grid gap-6 mb-6 sm:grid-cols-2">
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-gray-700">Type*</label>
                        <select id="countries"
                            class="w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                            v-model="oresStore.ores_registration.type" required>
                            <option disabled value="" selected>Select the Type</option>
                            <option value="lumps">Lumps</option>
                            <option value="fines">Fines</option>
                            <option value="iron pellets">Iron Pellets</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-gray-700">Grade(Fe%)*</label>
                        <input
                            class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                            @change="validationStore.validation(oresStore.ores_registration.grade)"
                            v-model="oresStore.ores_registration.grade.value" minlength="3" maxlength="30" type="text"
                            placeholder="Enter the Fe percentage" required>
                        <span class="text-center text-sm text-red-500"
                            v-if="!oresStore.ores_registration.grade.valid">{{
                                    oresStore.ores_registration.grade.message
                            }}</span>
                    </div>
                </div>
                <div class="grid gap-6 mb-6 grid-cols-1">
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-gray-700">Quantity*</label>
                        <input
                            class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                            @change="validationStore.validation(oresStore.ores_registration.quantity)"
                            v-model="oresStore.ores_registration.quantity.value" minlength="3" maxlength="30"
                            type="number" required>
                        <span class="text-center text-sm text-red-500"
                            v-if="!oresStore.ores_registration.quantity.valid">{{
                                    oresStore.ores_registration.quantity.message
                            }}</span>
                    </div>
                </div>
                <div class="grid gap-6 mb-6 grid-cols-1">
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-gray-700">Upload
                            Pdf*</label>
                        <input
                            class="w-full content-center text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                            @change="oresStore.preview_document" type="file" accept="application/pdf" required>
                    </div>
                </div>
                <div class="space-y-3 py-5">
                    <button type="submit"
                        class="w-full flex justify-center bg-orange-400 hover:bg-orange-500 text-gray-100 p-3 rounded-full font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>