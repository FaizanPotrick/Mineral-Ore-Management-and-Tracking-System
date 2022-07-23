import { defineStore } from "pinia";

export default defineStore({
  id: "alert",
  state: () => ({
    alert_box: [],
    alert_text: {
      message: "",
      type: "",
      alertbox: false,
    },
  }),
  actions: {
    open_alert_box(message, type) {
      this.alert_box.push({
        id: Date.now(),
        message: message,
        type: type,
        alertbox: true,
      });
    },
    close_alert_box(id) {
      this.alert_box = this.alert_box.filter(
        (item) => item.id !== id && item.alertbox
      );
    },
    open_alert_text(message, type) {
      this.alert_text.message = message;
      this.alert_text.type = type;
      this.alert_text.alertbox = false;
    },
  },
});
