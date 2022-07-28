import { defineStore } from "pinia";
import useAlertStore from "../Alert";
import useValidationStore from "../Validation";
const { open_alert_box, open_alert_text } = useAlertStore();

export default defineStore({
  id: "miner_registration",
  state: () => ({
    organization_id: "",
    region_id: "",
    manager_name: {
      value: "",
      valid: true,
      regex: /^([ a-zA-Z]+)$/,
      message: "Name must be alphabetic",
    },
    manager_email_address: {
      value: "",
      valid: true,
      regex: /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/,
      message: "Enter a valid email address",
    },
    manager_phone_no: {
      value: "",
      valid: true,
      regex: /^([0-9]+)$/,
      message: "Phone number must be numeric",
    },
    manager_aadhar_card: {
      value: "",
      valid: true,
      regex: /^([0-9]+)$/,
      message: "Aadhar card must be numeric",
    },
    mine_state: "",
    mine_district: "",
    mine_pin_code: {
      value: "",
      valid: true,
      regex: /^([0-9]+)$/,
      message: "Pin Code must be Valid",
    },
    mine_area: {
      value: 0,
      valid: true,
      regex: /^((?!(0))[0-9]+)$/,
      message: "It must be a positive number",
    },
    mine_warehouse_capacity: {
      value: 0,
      valid: true,
      regex: /^((?!(0))[0-9]+)$/,
      message: "It must be a positive number",
    },
    lease_period: {
      value: 0,
      valid: true,
      regex: /^((?!(0))[0-9]+)$/,
      message: "It must be a positive number",
    },
    center: {
      lat: 20.5937,
      lng: 78.9629,
    },
    zoom: 4,
    states_list: [],
    districts_list: [],
    district_list: [],
    coordinates: {
      lat: 0,
      lng: 0,
    },
  }),
  actions: {
    district_selector() {
      this.district_list = this.districts_list.filter((state) => {
        return this.mine_state === state.state;
      });
    },
    coordinates_selector() {
      this.districts_list.filter((region) => {
        if (
          this.mine_state === region.state &&
          this.mine_district === region.district
        ) {
          this.center = {
            lat: region.coordinates.latitude,
            lng: region.coordinates.longitude,
          };
          this.zoom = 10;
          this.region_id = region._id;
        }
      });
    },
    marker_selector(e) {
      this.coordinates = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
    },
    async register_fn() {
      if (
        !this.manager_name.valid ||
        !this.manager_email_address.valid ||
        !this.manager_phone_no.valid ||
        !this.manager_aadhar_card.valid ||
        !this.mine_pin_code.valid ||
        this.mine_area.value <= 0 ||
        !this.mine_area.valid ||
        !this.mine_warehouse_capacity.valid ||
        this.mine_warehouse_capacity.value <= 0 ||
        !this.lease_period.valid ||
        this.lease_period.value <= 0 ||
        this.coordinates.lat === 0 ||
        this.coordinates.lng === 0
      ) {
        console.log("hii");
        open_alert_text(
          "Please fill all the required fields correctly",
          "error"
        );
        return;
      }
      open_alert_text("", "");
      useValidationStore().isLoading = true;
      const res = await fetch("/api/registration/miner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization_id: this.organization_id,
          manager_name: this.manager_name.value,
          email_address: this.manager_email_address.value,
          phone_no: this.manager_phone_no.value,
          aadhar_card: this.manager_aadhar_card.value,
          region_id: this.mine_state,
          pin_code: this.mine_pin_code.value,
          area: this.mine_area.value,
          warehouse_capacity: this.mine_warehouse_capacity.value,
          period: this.lease_period.value,
          coordinates: this.coordinates,
        }),
      });
      const data = await res.json();
      useValidationStore().isLoading = false;
      open_alert_box(data.message, data.type);
      if (res.status === 200) {
        this.organization_id = "";
        this.region_id = "";
        this.manager_name.value = "";
        this.manager_email_address.value = "";
        this.manager_phone_no.value = "";
        this.manager_aadhar_card.value = "";
        this.mine_state = "";
        this.mine_district = "";
        this.mine_pin_code.value = "";
        this.mine_area.value = 0;
        this.mine_warehouse_capacity.value = 0;
        this.lease_period.value = 0;
        this.center = {
          lat: 20.5937,
          lng: 78.9629,
        };
        this.zoom = 4;
        this.states_list = [];
        this.districts_list = [];
        this.district_list = [];
        this.coordinates = {
          lat: 0,
          lng: 0,
        };
      }
    },
  },
});
