import { defineStore } from "pinia";
import axios from "axios";
import useAlertStore from "./Alert";
import useValidationStore from "./Validation";
const { open_alert_box, isAlert_text } = useAlertStore();

export default defineStore({
  id: "officers_store",
  state: () => ({
    officers: [],
    position: "",
    cards: [],
    markers: [],
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
    region: "",
  }),
  actions: {
    async officer_dashboard(route) {
      const {
        data: { position, cards, markers },
      } = await axios.get(
        `/api/dashboard/officer/${
          route.params.region_type === undefined &&
          route.params.region_id === undefined
            ? $cookies.get("type_of_region")
            : `${route.params.region_type}?region_id=${route.params.region_id}`
        }`
      );
      this.position = position;
      this.officer_markers = markers;
      this.officer_cards = cards;
    },
    async get_officers() {
      const { data } = await axios.get(
        `/api/officers/officer/${$cookies.get("type_of_region")}`
      );
      this.officers = data;
    },
    async officer_register_fn() {
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
        url: "/api/registration/officer",
        data: {
          name: this.name.value,
          email_address: this.email_address.value,
          phone_no: this.phone_no.value,
          aadhar_card: this.aadhar_card.value,
          type_of_region:
            $cookies.get("type_of_region") === "country" ? "state" : "district",
          region: this.region,
        },
      })
        .then((res) => {
          open_alert_box(res.data.message, res.data.type);
          if (res.status === 200) {
            this.name.value = "";
            this.email_address.value = "";
            this.phone_no.value = "";
            this.aadhar_card.value = "";
            this.region = "";
          }
        })
        .catch((err) => {
          open_alert_box(err.response.data.message, err.response.data.type);
        });
      useValidationStore().isButtonLoading = false;
    },
  },
});
