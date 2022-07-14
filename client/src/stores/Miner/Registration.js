import { defineStore } from "pinia";
import { useAlertStore } from "../Alert";
const alertStore = useAlertStore();
const { open_alert_box, open_alert_text } = alertStore;

export const useCredentialStore = defineStore({
  id: "miner_registration",
  state: () => ({
    registration: {
      mine_name: {
        value: "",
        valid: true,
        regex: /^([ a-zA-Z]+)$/,
        message: "Name must be alphabetic",
      },
      location: {
        value: "",
        valid: true,
        regex: /^([ a-zA-Z0-9,/-]+)$/,
        message: "Please enter a proper location",
      },
      owner_name: {
        value: "",
        valid: true,
        regex: /^([ a-zA-Z]+)$/,
        message: "Name must be alphabetic",
      },
      email_address: {
        value: "",
        valid: true,
        regex: /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/,
        message: "Please enter a valid email address",
      },
      phone_no: {
        value: "",
        country_code: "+91",
        valid: true,
        regex: /^([0-9]+)$/,
        message: "Phone number must be numeric",
      },
      block_no: {
        value: "",
        valid: true,
        regex: /^([a-zA-Z0-9]+)$/,
        message: "String must be alphanumeric and numeric only",
      },
      gst_no: {
        value: "",
        valid: true,
        regex: /^([a-zA-Z0-9]+)$/,
        message: "String must be alphanumeric and numeric only",
      },
      period: {
        value: 1,
        valid: true,
        regex: /^([0-9]+)$/,
        message: "It must contain atleast one lease period",
      },
    },
    login: {
      email_address: "",
      password: "",
    },
    isLoading: false,
  }),
  actions: {
    async register() {
      const {
        mine_name,
        location,
        owner_name,
        email_address,
        phone_no,
        block_no,
        gst_no,
        period,
      } = this.registration;

      if (
        !mine_name.valid ||
        !location.valid ||
        !owner_name.valid ||
        !email_address.valid ||
        !phone_no.valid ||
        !block_no.valid ||
        !gst_no.valid ||
        !period.valid ||
        period.value <= 0
      ) {
        open_alert_text(
          "Please fill all the required fields correctly",
          "error"
        );
        return;
      }
      open_alert_text("", "");
      this.isLoading = true;
      const res = await fetch("http://localhost:8000/miner/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mine_name: mine_name.value,
          location: location.value,
          owner_name: owner_name.value,
          email_address: email_address.value,
          phone_no: `${phone_no.country_code}-${phone_no.value}`,
          block_no: block_no.value,
          gst_no: gst_no.value,
          period: period.value,
        }),
      });
      const data = await res.json();
      this.isLoading = false;
      if (res.status === 201) {
        open_alert_text(data.message, data.type);
        return;
      }
      if (res.status === 200) {
        mine_name.value = "";
        location.value = "";
        owner_name.value = "";
        email_address.value = "";
        phone_no.value = "";
        block_no.value = "";
        gst_no.value = "";
        period.value = 1;
        open_alert_box(data.message, data.type);
        return;
      }
      if (res.status === 400) {
        open_alert_box(data.message, data.type);
        return;
      }
    },
  },
});
