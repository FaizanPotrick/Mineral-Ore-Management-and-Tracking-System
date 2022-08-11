import { defineStore } from "pinia";
import axios from "axios";
import useAlertStore from "./Alert";
import useValidationStore from "./Validation";
const { open_alert_box, isAlert_text } = useAlertStore();

export default defineStore({
  id: "user_store",
  state: () => ({
    name: {
      value: "",
      valid: true,
      regex: /^([ a-zA-Z]+)$/,
    },
    email_address: {
      value: "",
      valid: true,
      regex: /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/,
    },
    phone_no: {
      value: "",
      valid: true,
      regex: /^([0-9]+)$/,
    },
    aadhar_card: {
      value: "",
      valid: true,
      regex: /^([0-9]+)$/,
    },
  }),
  actions: {
    async ceo_register_fn(router) {
      if (
        !this.name.valid ||
        !this.email_address.valid ||
        !this.phone_no.valid ||
        !this.aadhar_card.valid
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
            router.push("/login");
          }
        })
        .catch((err) => {
          open_alert_box(err.response.data.message, err.response.data.type);
        });
      useValidationStore().isButtonLoading = false;
    },
    async manager_register_fn(route) {
      if (
        !this.name.valid ||
        !this.email_address.valid ||
        !this.phone_no.valid ||
        !this.aadhar_card.valid
      ) {
        isAlert_text(true);
        return;
      }
      isAlert_text(false);
      useValidationStore().isButtonLoading = true;
      await axios({
        method: "post",
        url: `/api/registration/manager?mine_id=${route.params.mine_id}`,
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
          open_alert_box(err.response.data.message, err.response.data.type);
        });
      useValidationStore().isButtonLoading = false;
    },
  },
});
