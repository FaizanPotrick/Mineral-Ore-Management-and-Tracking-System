import { defineStore } from "pinia";

export default defineStore({
  id: "validation",
  state: () => ({
    isLoading: false,
  }),
  actions: {
    validation(input) {
      if (input.value === "") {
        input.valid = true;
      } else if (!input.regex.test(input.value)) {
        input.valid = false;
      } else {
        input.valid = true;
      }
    },
  },
});
