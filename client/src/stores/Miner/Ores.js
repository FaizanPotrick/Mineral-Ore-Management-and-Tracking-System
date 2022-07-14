import { defineStore } from "pinia";
import { useAlertStore } from "../Alert";
const alertStore = useAlertStore();
const { open_alert_box, open_alert_text } = alertStore;

export const useOresStore = defineStore({
  id: "miner_ores",
  state: () => ({
    oresForm: {
      type: {
        value: "",
        valid: true,
        regex: /^([ a-zA-Z]+)$/,
        message: "Type must be alphabetic",
      },
      grade: {
        value: "",
        valid: true,
        regex: /^([ a-zA-Z]+)$/,
        message: "Grade must be alphabetic",
      },
      quantity: {
        value: 0,
        valid: true,
        regex: /^([0-9]+)$/,
        message: "Quantity must be numeric",
      },
      document: {
        value: "",
        valid: true,
        regex: /^([a-zA-Z0-9]+)$/,
        message: "Document must be alphanumeric",
      },
    },
    isLoading: false,
  }),
  actions: {
    async oresRegistration() {
      const { type, grade, quantity, document } = this.oresForm;

      if (
        type.valid ||
        grade.valid ||
        quantity.valid ||
        quantity.value <= 0 ||
        document.valid
      ) {
        open_alert_text(
          "Please fill all the required fields correctly",
          "error"
        );
        return;
      }
      open_alert_text("", "");
      this.isLoading = true;
      const res = await fetch("http://localhost:8000/miner/ores_registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type.value,
          grade: grade.value,
          quantity: quantity.value,
          document: document.value,
        }),
      });
      const data = await res.json();
      this.isLoading = false;
      if (res.status === 200) {
        this.oresForm.type.value = "";
        this.oresForm.grade.value = "";
        this.oresForm.quantity.value = 0;
        this.oresForm.document.value = "";
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
