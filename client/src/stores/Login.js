import { defineStore } from "pinia";
import { useAlertStore } from "./Alert";
const alertStore = useAlertStore();
const { open_alert_box, open_alert_text } = alertStore;

export const useLoginStore = defineStore({
  id: "login",
  state: () => ({
    user_name: "",
    password: "",
    isLoading: false,
  }),
  actions: {
    async login_fn() {
      if (!this.user_name || !this.password) {
        open_alert_text(
          "Please fill all the required fields correctly",
          "error"
        );
        return;
      }
      open_alert_text("", "");
      this.isLoading = true;
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
      this.isLoading = false;
      if (res.status === 201) {
        open_alert_text(data.message, data.type);
        return;
      }
      if (res.status === 200) {
        this.user_name = "";
        this.password = "";
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
