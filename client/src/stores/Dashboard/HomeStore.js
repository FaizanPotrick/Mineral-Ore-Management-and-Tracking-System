import { defineStore } from "pinia";
import axios from "axios";
import Buttons from "@/assets/Buttons.json";

export default defineStore({
  id: "home_dashboard",
  state: () => ({
    user_name: "",
    user_email_address: "",
    company_name: "",
    markers: [],
    cards: [],
    doughnut: {},
    mines: [],
    organisations: [],
  }),
  actions: {
    async user_fetch() {
      const {
        data: { name, email_address },
      } = await axios.get(`/api/user/${$cookies.get("type_of_user")}`);
      this.user_name = name;
      this.user_email_address = email_address;
    },
    async dashboard_fetch() {
      const {
        data: { company_name, maps, cards, doughnut },
      } = await axios.get(
        `/api/dashboard/${$cookies.get("type_of_user")}${
          $cookies.get("type_of_user") === "officer"
            ? "/" + $cookies.get("type_of_region")
            : ""
        }`
      );
      if ($cookies.get("type_of_user") !== "miner") {
        this.markers = maps;
      }
      if ($cookies.get("type_of_user") !== "officer") {
        this.company_name = company_name;
      } else {
        this.company_name = $cookies.get("type_of_region");
        console.log(this.company_name);
      }
      this.cards = cards;
      if ($cookies.get("type_of_user") === "miner") {
        this.doughnut = doughnut;
      }
    },
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
          } else if ($cookies.get("type_of_user") === "organisation") {
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
    async mines_fetch() {
      const { data } = await axios.get(
        `/api/mines/${$cookies.get("type_of_user")}${
          $cookies.get("type_of_user") === "officer"
            ? "/" + $cookies.get("type_of_region")
            : ""
        }`
      );
      this.mines = data;
    },
    async organisations_fetch() {
      const { data } = await axios.get("/api/organisations/officer");
      this.organisations = data;
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
