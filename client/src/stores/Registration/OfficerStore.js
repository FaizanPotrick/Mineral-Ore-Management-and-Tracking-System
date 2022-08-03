import { defineStore } from "pinia";
import axios from "axios";
import useAlertStore from "../Alert";
import useValidationStore from "../Validation";
const { open_alert_box, isAlert_text } = useAlertStore();

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
    region_list: [],
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
        isAlert_text(true);
        return;
      }
      isAlert_text(false);
      useValidationStore().isButtonLoading = true;
      await axios({
        method: 'post',
        url: '/api/registration/officer',
        data: {
          officer_name: this.officer_name.value,
          email_address: this.officer_email_address.value,
          phone_no: this.officer_phone_no.value,
          aadhar_card: this.officer_aadhar_card.value,
          type_of_region:
            $cookies.get("type_of_region") === "country" ? "state" : "district",
          region_name: this.region_name,
        }
      }).then(res => {
        open_alert_box(res.data.message, res.data.type);
        if (res.status === 200) {
          this.officer_name.value = "";
          this.officer_email_address.value = "";
          this.officer_phone_no.value = "";
          this.officer_aadhar_card.value = "";
          this.type_of_region = "";
          this.region_name = "";
        }
      }).catch(err => {
        open_alert_box(err.response.data.message);
      });
      useValidationStore().isButtonLoading = false;
    },
  },
});
