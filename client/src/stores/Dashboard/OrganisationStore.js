import { defineStore } from "pinia";
import axios from "axios";

export default defineStore({
  id: "organisation_dashboard",
  state: () => ({
    organisation_name: "",
    organisation_cards: [],
    organisation_markers: [],
    organisation_transactions: [],
  }),
  actions: {
    async dashboard_fetch(route) {
      const {
        data: { company_name, cards, marker },
      } = await axios.get(
        `/api/dashboard/organisation?organisation_id=${route.params.organisation_id}`
      );
      this.organisation_markers = marker;
      this.organisation_name = company_name;
      this.organisation_cards = cards;
    },
  },
});
