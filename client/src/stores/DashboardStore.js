import { defineStore } from "pinia";
import axios from "axios";

export default defineStore({
  id: "dashboard",
  state: () => ({
    coordinates: [],
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
    async map_fetch() {
      const { data } = await axios.get(
        `/api/maps/${$cookies.get("type_of_user")}`
      );
      this.coordinates = data;
    },
    async card_fetch() {
      const { data } = await axios.get(
        `/api/cards/${$cookies.get("type_of_user")}`
      );
      this.card_data = data;
    },
    component_check(component) {
      return component.filter((button) => {
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
