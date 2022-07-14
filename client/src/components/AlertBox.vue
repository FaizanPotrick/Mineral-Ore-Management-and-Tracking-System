<script setup>
import { useAlertStore } from '@/stores/Alert';
const alertStore = useAlertStore();
</script>
<template>
    <div class="fixed bottom-0 right-0">
        <div v-for="alert in alertStore.alert_box" :key="alert.id"
            :class="{ 'bg-red-200 text-red-800': alert.type === 'error', 'bg-green-200 text-green-800': alert.type === 'success', 'bg-blue-200 text-blue-800': alert.type === 'info', 'bg-yellow-200 text-yellow-800': alert.type === 'warning' }"
            class="w-[20rem] m-5 flex justify-between items-center p-4 rounded-lg font-medium">
            <div>
                {{ alert.message }}
            </div>
            <button
                :class="{ 'hover:text-red-500': alert.type === 'error', 'hover:text-green-500': alert.type === 'success', 'hover:text-blue-500': alert.type === 'info', 'hover:text-yellow-500': alert.type === 'warning' }"
                class="h-8 w-8 ml-3" @click="alertStore.close_alert_box(alert.id)">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z">
                    </path>
                </svg>
            </button>
        </div>
    </div>
</template>