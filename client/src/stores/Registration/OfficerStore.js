import { defineStore } from "pinia";
import useAlertStore from "../Alert";
import useValidationStore from "../Validation";
const { open_alert_box, open_alert_text } = useAlertStore();

export default defineStore({
  id: "officer_registration",
  state: () => ({
    officer_name: {
      value: "",
      valid: true,
      regex: /^([ a-zA-Z]+)$/,
      message: "Name must be alphabetic",
    },
    officer_email_address: {
      value: "",
      valid: true,
      regex: /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/,
      message: "Enter a valid email address",
    },
    officer_phone_no: {
      value: "",
      valid: true,
      regex: /^([0-9]+)$/,
      message: "Phone number must be numeric",
    },
    officer_aadhar_card: {
      value: "",
      valid: true,
      regex: /^([0-9]+)$/,
      message: "Aadhar card must be numeric",
    },
    type_of_region: "central",
    region_name: "",
  }),
  actions: {
    async register_fn() {
      if (
        !this.officer_name.valid ||
        !this.officer_email_address.valid ||
        !this.officer_phone_no.valid ||
        !this.officer_aadhar_card.valid
      ) {
        open_alert_text(
          "Please fill all the required fields correctly",
          "error"
        );
        return;
      }
      open_alert_text("", "");
      useValidationStore().isLoading = true;
      const res = await fetch("/api/registration/officer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          officer_name: this.officer_name.value,
          email_address: this.officer_email_address.value,
          phone_no: this.officer_phone_no.value,
          aadhar_card: this.officer_aadhar_card.value,
          type_of_region: this.type_of_region,
          region_name: this.region_name,
        }),
      });
      const data = await res.json();
      useValidationStore().isLoading = false;
      open_alert_box(data.message, data.type);
      if (res.status === 200) {
        this.officer_name.value = "";
        this.officer_email_address.value = "";
        this.officer_phone_no.value = "";
        this.officer_aadhar_card.value = "";
        this.type_of_region = "";
        this.region_name = "";
      }
    },
  },
});
