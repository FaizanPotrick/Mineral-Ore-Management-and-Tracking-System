import { defineStore } from "pinia";
import useAlertStore from "./Alert";
import useValidationStore from "./Validation";
const { open_alert_box } = useAlertStore();

export default defineStore({
  id: "login",
  state: () => ({
    user_name: "",
    password: "",
  }),
  actions: {
    async login_fn() {
      useValidationStore().isLoading = true;
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: this.user_name,
          password: this.password,
        }),
      });
      const data = await res.json();
      useValidationStore().isLoading = false;
      open_alert_box(data.message, data.type);
      if (res.status === 200) {
        this.user_name = "";
        this.password = "";
      }
    },
  },
});
