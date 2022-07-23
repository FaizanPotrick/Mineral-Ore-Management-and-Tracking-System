<script setup>
import useOrganizationStore from '@/stores/Registration/Organization';
import useAlertStore from '@/stores/Alert';
import useValidationStore from '@/stores/Validation';
import HeaderVue from '@/components/Header.vue';
import FooterVue from '@/components/Footer.vue';
const { organization_name, address, ceo_name, ceo_email_address, ceo_phone_no, ceo_aadhar_card, gst_no, register_fn } = useOrganizationStore()
</script>
<template>
    <div>
        <HeaderVue />
        <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
            <div
                class="max-w-4xl w-[56rem] p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl m-5 sm:10 text-gray-800">
                <div class="mb-4">
                    <div class="font-semibold text-2xl text-yellow-700">Organization Registration</div>
                    <div class="text-gray-500 text-sm">Register your organization.</div>
                    <span
                        :class="{ 'text-red-500': useAlertStore().alert_text.type === 'error', 'text-green-500': useAlertStore().alert_text.type === 'success', 'text-blue-500': useAlertStore().alert_text.type === 'info', 'text-yellow-500': useAlertStore().alert_text.type === 'warning' }"
                        class="text-center text-sm"
                        v-if="useAlertStore().alert_text.message && !useAlertStore().alert_text.alertbox">{{
                                useAlertStore().alert_text.message
                        }}</span>
                </div>
                <form class="space-y-5 drop-shadow-md" @submit.prevent="register_fn()">
                    <div class="grid gap-6 mb-6 grid-cols-1">
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">Organisation Name*</label>
                            <input type="text"
                                class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                                placeholder="Enter the Organization Name"
                                @change="useValidationStore().validation(organization_name)"
                                v-model="organization_name.value" maxlength="300" required>
                            <span class="text-center text-sm text-red-500" v-if="!organization_name.valid">{{
                                    organization_name.message
                            }}</span>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">Address*</label>
                            <input type="text"
                                class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                                placeholder="Enter the Address" @change="useValidationStore().validation(address)"
                                v-model="address.value" maxlength="300" required>
                            <span class="text-center text-sm text-red-500" v-if="!address.valid">{{
                                    address.message
                            }}</span>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">CEO Name*</label>
                            <input type="text"
                                class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                                placeholder="Enter the CEO Name" @change="useValidationStore().validation(ceo_name)"
                                v-model="ceo_name.value" maxlength="150" required>
                            <span class="text-center text-sm text-red-500" v-if="!ceo_name.valid">{{
                                    ceo_name.message
                            }}</span>
                        </div>
                    </div>
                    <div class="grid gap-6 sm:grid-cols-2">
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">CEO Email
                                Address*</label>
                            <input type="email"
                                class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                                placeholder="Enter the Email Address"
                                @change="useValidationStore().validation(ceo_email_address)"
                                v-model="ceo_email_address.value" maxlength="150" required>
                            <span class="text-center text-sm text-red-500" v-if="!ceo_email_address.valid">{{
                                    ceo_email_address.message
                            }}</span>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">CEO Phone
                                No.*</label>
                            <input type="text"
                                class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                                placeholder="Enter the Phone No."
                                @change="useValidationStore().validation(ceo_phone_no)" v-model="ceo_phone_no.value"
                                minlength="10" maxlength="10" required>
                            <span class="text-center text-sm text-red-500" v-if="!ceo_phone_no.valid">{{
                                    ceo_phone_no.message
                            }}</span>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">CEO Aadhar Card*</label>
                            <input type="text"
                                class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                                placeholder="Enter the Aadhar Card Details"
                                @change="useValidationStore().validation(ceo_aadhar_card)"
                                v-model="ceo_aadhar_card.value" minlength="12" maxlength="12" required>
                            <span class="text-center text-sm text-red-500" v-if="!ceo_aadhar_card.valid">{{
                                    ceo_aadhar_card.message
                            }}</span>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">GST No.*</label>
                            <input type="text"
                                class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                                placeholder="Enter the GST Number" @change="useValidationStore().validation(gst_no)"
                                v-model="gst_no.value" minlength="15" maxlength="15" required>
                            <span class="text-center text-sm text-red-500" v-if="!gst_no.valid">{{
                                    gst_no.message
                            }}</span>
                        </div>
                    </div>
                    <div class="space-y-3 py-5">
                        <button type="submit" :class="{ 'hover:bg-yellow-600/80': !useValidationStore().isLoading }"
                            class="w-full flex text-lg justify-center items-center bg-yellow-600  text-gray-100 p-2.5 rounded-full font-semibold shadow-md"
                            :disabled="useValidationStore().isLoading">
                            <span v-if="!useValidationStore().isLoading" class="h-6">
                                Register
                            </span>
                            <span v-else>
                                <svg class="w-6 h-6 animate-spin text-yellow-600 fill-white" viewBox="0 0 100 101"
                                    fill="none">
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
        <FooterVue />
    </div>
</template>