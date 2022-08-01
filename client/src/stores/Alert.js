import { defineStore } from "pinia";

export default defineStore({
  id: "alert",
  state: () => ({
    alert_box: [],
    alert_text: {
      message: "Please fill all the required fields correctly",
      isAlert: false,
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
    isAlert_text(value) {
      this.alert_text.isAlert = value;
    },
  },
});
