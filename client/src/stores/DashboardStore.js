import { defineStore } from "pinia";
import axios from "axios";
import Buttons from "@/assets/json/Buttons.json";

export default defineStore({
  id: "dashboard",
  state: () => ({
    user_name: "",
    user_email_address: "",
    company_name: "",
    marker: [],
    card_data: [],
  }),
  actions: {
    async auth_fetch(router) {
      await axios.get("/api/type_of_user").catch(() => router.push("/login"));
      if ($cookies.get("type_of_user") === "officer") {
        await axios
          .get("/api/type_of_region")
          .catch(() => router.push("/login"));
      }
    },
    auth_check(route) {
      for (const user_type of route.meta.type_of_user) {
        if (user_type === $cookies.get("type_of_user")) {
          if ($cookies.get("type_of_user") === "officer") {
            for (const region_type of route.meta.type_of_region) {
              if (region_type === $cookies.get("type_of_region")) {
                return true;
              }
            }
            return false;
          } else if ($cookies.get("type_of_user") === "organization") {
            return true;
          } else if ($cookies.get("type_of_user") === "miner") {
            return true;
          } else {
            return false;
          }
        }
      }
      return false;
    },
    async user_fetch() {
      const { data } = await axios.get("/api/user_details");
      this.user_name = data.user_name;
      this.user_email_address = data.email_address;
    },
    async name_fetch() {
      const { data } = await axios.get("/api/name");
      this.company_name = data;
    },
    async map_fetch() {
      const { data } = await axios.get(
        `/api/maps/${$cookies.get("type_of_user")}`
      );
      this.marker = data;
    },
    async card_fetch() {
      const { data } = await axios.get(
        `/api/cards/${$cookies.get("type_of_user")}`
      );
      this.card_data = data;
    },
    buttons_fetch() {
      return Buttons.filter((button) => {
        for (const user_type of button.type_of_user) {
          if (user_type === $cookies.get("type_of_user")) {
            if ($cookies.get("type_of_user") === "officer") {
              for (const region_type of button.type_of_region) {
                return region_type === $cookies.get("type_of_region");
              }
            }
            return user_type === $cookies.get("type_of_user");
          }
        }
      });
    },
  },
});
