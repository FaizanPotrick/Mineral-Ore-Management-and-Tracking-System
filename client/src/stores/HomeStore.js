import { defineStore } from "pinia";
import axios from "axios";
import Buttons from "@/assets/Buttons.json";

export default defineStore({
  id: "home_dashboard",
  state: () => ({
    user_name: "",
    user_email_address: "",
  }),
  actions: {
    async user_fetch() {
      const {
        data: { name, email_address },
      } = await axios.get(`/api/user/${$cookies.get("type_of_user")}`);
      this.user_name = name;
      this.user_email_address = email_address;
    },
    buttons_fetch() {
      return Buttons.filter((button) => {
        for (const user_type of button.type_of_user) {
          if (user_type === $cookies.get("type_of_user")) {
            if ($cookies.get("type_of_user") === "officer") {
              for (let i = 0; i < button.type_of_region.length; i++) {
                if (
                  button.type_of_region[i] === $cookies.get("type_of_region")
                ) {
                  return true;
                }
              }
              return false;
            }
            return user_type === $cookies.get("type_of_user");
          }
        }
      });
    },
  },
});
