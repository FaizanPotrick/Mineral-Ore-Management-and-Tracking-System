import { defineStore } from "pinia";
import axios from "axios";
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
    async login_fn(router) {
      useValidationStore().isButtonLoading = true;
      await axios({
        method: 'post',
        url: '/api/login',
        data: {
          user_name: this.user_name,
          password: this.password,
        }
      }).then(res => {
        open_alert_box(res.data.message, res.data.type);
        if (res.status === 200) {
          this.user_name = "";
          this.password = "";
          router.push("/dashboard");
        }
      }).catch(err => {
        open_alert_box(err.response.data.message);
      });
      useValidationStore().isButtonLoading = false;
    },
  },
});
