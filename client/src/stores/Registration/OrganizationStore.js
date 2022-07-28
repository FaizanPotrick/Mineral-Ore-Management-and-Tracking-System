import { defineStore } from "pinia";
import useAlertStore from "../Alert";
import useValidationStore from "../Validation";
const { open_alert_box, open_alert_text } = useAlertStore();

export default defineStore({
  id: "organization_registration",
  state: () => ({
    organization_name: {
      value: "",
      valid: true,
      regex: /^([ a-zA-Z]+)$/,
      message: "Name must be alphabetic",
    },
    address: "",
    ceo_name: {
      value: "",
      valid: true,
      regex: /^([ a-zA-Z]+)$/,
      message: "Name must be alphabetic",
    },
    ceo_email_address: {
      value: "",
      valid: true,
      regex: /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/,
      message: "Please enter a valid email address",
    },
    ceo_phone_no: {
      value: "",
      valid: true,
      regex: /^([0-9]+)$/,
      message: "Phone number must be numeric",
    },
    ceo_aadhar_card: {
      value: "",
      valid: true,
      regex: /^([0-9]+)$/,
      message: "Aadhar card must be numeric",
    },
    gst_no: {
      value: "",
      valid: true,
      regex: /^([a-zA-Z0-9]+)$/,
      message: "Enter a proper GST number",
    },
  }),
  actions: {
    async register_fn() {
      if (
        !this.organization_name.valid ||
        !this.ceo_name.valid ||
        !this.ceo_email_address.valid ||
        !this.ceo_phone_no.valid ||
        !this.ceo_aadhar_card.valid ||
        !this.gst_no.valid
      ) {
        open_alert_text(
          "Please fill all the required fields correctly",
          "error"
        );
        return;
      }
      open_alert_text("", "");
      useValidationStore().isLoading = true;
      const res = await fetch("/api/registration/organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization_name: this.organization_name.value,
          address: this.address,
          ceo_name: this.ceo_name.value,
          email_address: this.ceo_email_address.value,
          phone_no: this.ceo_phone_no.value,
          aadhar_card: this.ceo_aadhar_card.value,
          gst_no: this.gst_no.value,
        }),
      });
      const data = await res.json();
      useValidationStore().isLoading = false;
      open_alert_box(data.message, data.type);
      if (res.status === 200) {
        this.organization_name.value = "";
        this.address = "";
        this.ceo_name.value = "";
        this.ceo_email_address.value = "";
        this.ceo_phone_no.value = "";
        this.ceo_aadhar_card.value = "";
        this.gst_no.value = "";
      }
    },
  },
});
