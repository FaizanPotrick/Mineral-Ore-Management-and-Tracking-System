import { defineStore } from "pinia";

export const useValidationStore = defineStore({
  id: "validation",
  state: () => ({}),
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
