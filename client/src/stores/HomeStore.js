import { defineStore } from "pinia";
import Buttons from "@/assets/Buttons.json";

export default defineStore({
  id: "home_dashboard",
  state: () => ({}),
  actions: {
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
    buttons_test() {
      return Buttons.filter((button) => {
        if (button.type_of_user.includes($cookies.get("type_of_user"))) {
          if (button.type_of_user.includes("officer")) {
            if (
              button.type_of_region.includes($cookies.get("type_of_region"))
            ) {
              return true;
            }
          }
          return true;
        }
        return false;
      });
    },
  },
});
