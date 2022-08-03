import { defineStore } from "pinia";
import useAlertStore from "../Alert";
import useValidationStore from "../Validation";
const { open_alert_box, isAlert_text } = useAlertStore();

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
        return isAlert_text(true);
      }
      isAlert_text(false);
      useValidationStore().isButtonLoading = true;
      await axios({
        method: 'post',
        url: '/api/registration/organization',
        data: {
          organization_name: this.organization_name.value,
          address: this.address,
          ceo_name: this.ceo_name.value,
          email_address: this.ceo_email_address.value,
          phone_no: this.ceo_phone_no.value,
          aadhar_card: this.ceo_aadhar_card.value,
          gst_no: this.gst_no.value,
        }
      }).then(res => {
        open_alert_box(res.data.message, res.data.type);
        if (res.status === 200) {
          this.organization_name.value = "";
          this.address = "";
          this.ceo_name.value = "";
          this.ceo_email_address.value = "";
          this.ceo_phone_no.value = "";
          this.ceo_aadhar_card.value = "";
          this.gst_no.value = "";
        }
      }).catch(err => {
        open_alert_box(err.response.data.message);
      });
      useValidationStore().isButtonLoading = false;
    },
  },
});
