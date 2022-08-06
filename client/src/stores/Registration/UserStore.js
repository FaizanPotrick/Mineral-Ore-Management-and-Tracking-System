import { defineStore } from "pinia";
import axios from "axios";
import useAlertStore from "../Alert";
import useValidationStore from "../Validation";
const { open_alert_box, isAlert_text } = useAlertStore();

export default defineStore({
  id: "officer_registration",
  state: () => ({
    name: {
      value: "",
      valid: true,
      regex: /^([ a-zA-Z]+)$/,
      message: "Name must be alphabetic",
    },
    email_address: {
      value: "",
      valid: true,
      regex: /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/,
      message: "Enter a valid email address",
    },
    phone_no: {
      value: "",
      valid: true,
      regex: /^([0-9]+)$/,
      message: "Phone number must be numeric",
    },
    aadhar_card: {
      value: "",
      valid: true,
      regex: /^([0-9]+)$/,
      message: "Aadhar card must be numeric",
    },
  }),
  actions: {
    async ceo_register_fn() {
      if (
        this.name.valid ||
        this.email_address.valid ||
        this.phone_no.valid ||
        this.aadhar_card.valid
      ) {
        isAlert_text(true);
        return;
      }
      isAlert_text(false);
      useValidationStore().isButtonLoading = true;
      await axios({
        method: "post",
        url: "/api/registration/ceo",
        data: {
          name: this.name.value,
          email_address: this.email_address.value,
          phone_no: this.phone_no.value,
          aadhar_card: this.aadhar_card.value,
        },
      })
        .then((res) => {
          open_alert_box(res.data.message, res.data.type);
          if (res.status === 200) {
            this.name.value = "";
            this.email_address.value = "";
            this.phone_no.value = "";
            this.aadhar_card.value = "";
          }
        })
        .catch((err) => {
          open_alert_box(err.response.data.message);
        });
      useValidationStore().isButtonLoading = false;
    },
    async manager_register_fn() {
      if (
        this.name.valid ||
        this.email_address.valid ||
        this.phone_no.valid ||
        this.aadhar_card.valid
      ) {
        isAlert_text(true);
        return;
      }
      isAlert_text(false);
      useValidationStore().isButtonLoading = true;
      await axios({
        method: "post",
        url: "/api/registration/manager",
        data: {
          name: this.name.value,
          email_address: this.email_address.value,
          phone_no: this.phone_no.value,
          aadhar_card: this.aadhar_card.value,
        },
      })
        .then((res) => {
          open_alert_box(res.data.message, res.data.type);
          if (res.status === 200) {
            this.name.value = "";
            this.email_address.value = "";
            this.phone_no.value = "";
            this.aadhar_card.value = "";
          }
        })
        .catch((err) => {
          open_alert_box(err.response.data.message);
        });
      useValidationStore().isButtonLoading = false;
    },
  },
});
