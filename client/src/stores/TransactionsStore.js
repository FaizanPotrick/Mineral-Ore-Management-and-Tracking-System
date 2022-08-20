import { defineStore } from "pinia";
import axios from "axios";

export default defineStore({
  id: "transaction_store",
  state: () => ({
    transactions: [],
  }),
  actions: {
    async get_transaction() {
      const { data } = await axios.get(
        `/api/transactions/${
          $cookies.get("type_of_user") === "officer"
            ? `officer/district`
            : "miner"
        }`
      );
      this.transactions = data;
    },
  },
});
