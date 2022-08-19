import { defineStore } from "pinia";
import axios from "axios";
import useAlertStore from "./Alert";
import useValidationStore from "./Validation";
const { open_alert_box, isAlert_text } = useAlertStore();

export default defineStore({
  id: "organisation_store",
  state: () => ({
    organisations: [],
    company_name: "",
    cards: [],
    markers: [],
    transactions: [],
    organisation_name: {
      value: "",
      valid: true,
      regex: /^([ a-zA-Z]+)$/,
    },
    address: "",
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
    gst_no: {
      value: "",
      valid: true,
      regex: /^([a-zA-Z0-9]+)$/,
    },
  }),
  actions: {
    async organisation_dashboard(route) {
      const {
        data: { cards, company_name, markers },
      } = await axios.get(
        `/api/dashboard/organisation${
          route.params.organisation_id === undefined
            ? ""
            : `?organisation_id=${route.params.organisation_id}`
        }`
      );
      // console.log(data);
      this.company_name = company_name;
      this.markers = markers;
      this.cards = cards;
    },
    async get_organisations() {
      const { data } = await axios.get("/api/organisations/officer");
      this.organisations = data;
    },
    async organisation_register_fn() {
      if (
        !this.organisation_name.valid ||
        !this.name.valid ||
        !this.email_address.valid ||
        !this.phone_no.valid ||
        !this.aadhar_card.valid ||
        !this.gst_no.valid
      ) {
        return isAlert_text(true);
      }
      isAlert_text(false);
      useValidationStore().isButtonLoading = true;
      await axios({
        method: "post",
        url: "/api/registration/organisation",
        data: {
          organisation_name: this.organisation_name.value,
          address: this.address,
          name: this.name.value,
          email_address: this.email_address.value,
          phone_no: this.phone_no.value,
          aadhar_card: this.aadhar_card.value,
          gst_no: this.gst_no.value,
        },
      })
        .then((res) => {
          open_alert_box(res.data.message, res.data.type);
          if (res.status === 200) {
            this.organisation_name.value = "";
            this.address = "";
            this.name.value = "";
            this.email_address.value = "";
            this.phone_no.value = "";
            this.aadhar_card.value = "";
            this.gst_no.value = "";
          }
        })
        .catch((err) => {
          open_alert_box(err.response.data.message, err.response.data.type);
        });
      useValidationStore().isButtonLoading = false;
    },
  },
});
