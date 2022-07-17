import { defineStore } from "pinia";
import { useAlertStore } from "./Alert";
const alertStore = useAlertStore();
const { open_alert_box, open_alert_text } = alertStore;

export const useLoginStore = defineStore({
  id: "login",
  state: () => ({
    miner_login: {
      email_address: {
        value: "",
        valid: true,
        regex: /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/,
        message: "Please enter a valid email address",
      },
      password: {
        value: "",
        valid: true,
        regex: /^([A-Za-z0-9@$#^!%*?&]+)$/,
        message: "Password must be alphanumeric, numeric and special character",
      },
    },
    gov_login: {
      email_address: {
        value: "",
        valid: true,
        regex: /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/,
        message: "Please enter a valid email address",
      },
      password: {
        value: "",
        valid: true,
        regex: /^([A-Za-z0-9@$#^!%*?&]+)$/,
        message: "Password must be alphanumeric, numeric and special character",
      },
    },
    buyer_login: {
      email_address: {
        value: "",
        valid: true,
        regex: /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/,
        message: "Please enter a valid email address",
      },
      password: {
        value: "",
        valid: true,
        regex: /^([A-Za-z0-9@$#^!%*?&]+)$/,
        message: "Password must be alphanumeric, numeric and special character",
      },
    },
    isLoading: false,
  }),
  actions: {
    login_fn(login_id) {
      if (login_id === "gov_login") {
        return this.gov_login_fn();
      } else if (login_id === "miner_login") {
        return this.miner_login_fn();
      } else if (login_id === "buyer_login") {
        return this.buyer_login_fn();
      }
    },
    login_credentials(login_id) {
      if (login_id === "gov_login") {
        return this.gov_login;
      } else if (login_id === "miner_login") {
        return this.miner_login;
      } else if (login_id === "buyer_login") {
        return this.buyer_login;
      }
    },
    async gov_login_fn() {
      const { email_address, password } = this.gov_login;
      if (!email_address.valid || !password.valid) {
        open_alert_text(
          "Please fill all the required fields correctly",
          "error"
        );
        return;
      }
      open_alert_text("", "");
      this.isLoading = true;
      const res = await fetch("/api/gov/credentials", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email_address.value,
          password: password.value,
        }),
      });
      const data = await res.json();
      this.isLoading = false;
      if (res.status === 201) {
        open_alert_text(data.message, data.type);
        return;
      }
      if (res.status === 200) {
        this.gov_login.email_address.value = "";
        this.gov_login.password.value = "";
        open_alert_box(data.message, data.type);
        return;
      }
      if (res.status === 400) {
        open_alert_box(data.message, data.type);
        return;
      }
    },
    async miner_login_fn() {
      const { email_address, password } = this.miner_login;
      if (!email_address.valid || !password.valid) {
        open_alert_text(
          "Please fill all the required fields correctly",
          "error"
        );
        return;
      }
      open_alert_text("", "");
      this.isLoading = true;
      const res = await fetch("/api/miner/credentials", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email_address.value,
          password: password.value,
        }),
      });
      const data = await res.json();
      this.isLoading = false;
      if (res.status === 201) {
        open_alert_text(data.message, data.type);
        return;
      }
      if (res.status === 200) {
        this.miner_login.email_address.value = "";
        this.miner_login.password.value = "";
        open_alert_box(data.message, data.type);
        return;
      }
      if (res.status === 400) {
        open_alert_box(data.message, data.type);
        return;
      }
    },
    async buyer_login_fn() {
      const { email_address, password } = this.miner_login;
      if (!email_address.valid || !password.valid) {
        open_alert_text(
          "Please fill all the required fields correctly",
          "error"
        );
        return;
      }
      open_alert_text("", "");
      this.isLoading = true;
      const res = await fetch("/api/buyer/credentials", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email_address.value,
          password: password.value,
        }),
      });
      const data = await res.json();
      this.isLoading = false;
      if (res.status === 201) {
        open_alert_text(data.message, data.type);
        return;
      }
      if (res.status === 200) {
        this.buyer_login.email_address.value = "";
        this.buyer_login.password.value = "";
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
