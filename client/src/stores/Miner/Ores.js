import { defineStore } from "pinia";
import useAlertStore from "../Alert";
const { open_alert_box, open_alert_text } = useAlertStore();

export const useOresStore = defineStore({
  id: "miner_ores",
  state: () => ({
    ores_registration: {
      type: "",
      grade: {
        value: "",
        valid: true,
        regex: /^([0-9]+)\%$/,
        message: "Grade must be in percentage",
      },
      quantity: {
        value: 0,
        valid: true,
        regex: /^([0-9]+)$/,
        message: "Quantity must be numeric",
      },
      document: "",
    },
    isLoading: false,
  }),
  actions: {
    preview_document(event) {
      this.ores_registration.document = event.target.files[0];
    },
    async oresRegistration() {
      const { type, grade, quantity, document } = this.ores_registration;
      if (!grade.valid || !quantity.valid || quantity.value <= 0) {
        open_alert_text(
          "Please fill all the required fields correctly",
          "error"
        );
        return;
      }
      open_alert_text("", "");
      this.isLoading = true;
      const formData = new FormData();
      formData.append("type", type);
      formData.append("grade", grade.value);
      formData.append("quantity", quantity.value);
      formData.append("document", document);
      const res = await fetch("/api/miner/ores_registration", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      this.isLoading = false;
      if (res.status === 201) {
        open_alert_text(data.message, data.type);
        return;
      }
      if (res.status === 200) {
        this.ores_registration.type = "";
        this.ores_registration.grade.value = "";
        this.ores_registration.quantity.value = 0;
        this.ores_registration.document = "";
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
