import { defineStore } from "pinia";
import axios from "axios";

export default defineStore({
  id: "mine_dashboard",
  state: () => ({
    mine_name: "",
    mine_cards: [],
    mine_markers: [],
    mine_minded_batches: [],
    mine_transactions: [],
  }),
  actions: {
    async mine_card_fetch(route) {
      const { data } = await axios.get(
        `/api/cards/miner?mine_id=${route.params.mine_id}`
      );
      this.mine_cards = data;
    },
  },
});
