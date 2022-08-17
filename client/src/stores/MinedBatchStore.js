import { defineStore } from "pinia";
import axios from "axios";
import useAlertStore from "./Alert";
import useValidationStore from "./Validation";
const { open_alert_box, isAlert_text } = useAlertStore();

export default defineStore({
    id: "mined_batch_store",
    state: () => ({
        mines: [],
        company_name: "",
        cards: [],
        doughnut: [],
        minded_batches: [],
        transactions: [],
        organisations: [],
        organisation_id: "",
        name: {
            value: "",
            valid: true,
            regex: /^([ a-zA-Z]+)$/,
        },
        email_address: {
            value: "",
            valid: true,
            regex: /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/,
        },
        phone_no: {
            value: "",
            valid: true,
            regex: /^([0-9]+)$/,
        },
        aadhar_card: {
            value: "",
            valid: true,
            regex: /^([0-9]+)$/,
        },
        pin_code: {
            value: "",
            valid: true,
            regex: /^([0-9]+)$/,
        },
        area: {
            value: 0,
            valid: true,
            regex: /^((?!(0))[0-9]+)$/,
        },
        warehouse_capacity: {
            value: 0,
            valid: true,
            regex: /^((?!(0))[0-9]+)$/,
        },
        lease_period: {
            value: 0,
            valid: true,
            regex: /^((?!(0))[0-9]+)$/,
        },
        center: [78.9629, 20.5937],
        zoom: 4,
        coordinates: {
            latitude: 0,
            longitude: 0,
        },
        type_of_ore: "",
        fe_percentage: 0,
        quantity: 0,
        sample_image: "",
        mine_lap_report: "",
    }),
    actions: {
        async get_mines() {
            const { data } = await axios.get(
                `/api/mined_batches/${$cookies.get("type_of_user") === "officer"
                    ? `officer/district`
                    : "miner"
                }`
            );
            this.mines = data;
            console.log(data);
        },

        marker_selector(e) {
            this.coordinates = {
                latitude: e.feature.values_.geometry.flatCoordinates[1],
                longitude: e.feature.values_.geometry.flatCoordinates[0],
            };
        },
        async mine_register_fn() {
            if (
                !this.name.valid ||
                !this.email_address.valid ||
                !this.phone_no.valid ||
                !this.aadhar_card.valid ||
                !this.pin_code.valid ||
                this.area.value <= 0 ||
                !this.area.valid ||
                !this.warehouse_capacity.valid ||
                this.warehouse_capacity.value <= 0 ||
                !this.lease_period.valid ||
                this.lease_period.value <= 0 ||
                this.coordinates.latitude === 0 ||
                this.coordinates.longitude === 0
            ) {
                isAlert_text(true);
                return;
            }
            isAlert_text(false);
            useValidationStore().isButtonLoading = true;
            await axios({
                method: "post",
                url: "/api/registration/mine",
                data: {
                    organisation_id: this.organisation_id,
                    name: this.name.value,
                    email_address: this.email_address.value,
                    phone_no: this.phone_no.value,
                    aadhar_card: this.aadhar_card.value,
                    pin_code: this.pin_code.value,
                    area: this.area.value,
                    warehouse_capacity: this.warehouse_capacity.value,
                    period: this.lease_period.value,
                    coordinates: this.coordinates,
                },
            })
                .then((res) => {
                    open_alert_box(res.data.message, res.data.type);
                    if (res.status === 200) {
                        this.organisation_id = "";
                        this.name.value = "";
                        this.email_address.value = "";
                        this.phone_no.value = "";
                        this.aadhar_card.value = "";
                        this.pin_code.value = "";
                        this.area.value = 0;
                        this.warehouse_capacity.value = 0;
                        this.lease_period.value = 0;
                        this.center = [78.9629, 20.5937];
                        this.zoom = 4;
                        this.coordinates = {
                            latitude: 0,
                            longitude: 0,
                        };
                    }
                })
                .catch((err) => {
                    open_alert_box(err.response.data.message, err.response.data.type);
                });
            useValidationStore().isButtonLoading = false;
        },
        store_image(event) {
            this.sample_image = event.target.files[0];
        },
        store_document(event) {
            this.mine_lap_report = event.target.files[0];
        },
        async ores_register_fn() {
            if (this.grade <= 0 || this.quantity <= 0) {
                isAlert_text(true);
                return;
            }
            isAlert_text(false);
            useValidationStore().isButtonLoading = true;
            const formData = new FormData();
            formData.append("type_of_ore", this.type_of_ore);
            formData.append("fe_percentage", this.fe_percentage);
            formData.append(
                "grade",
                this.fe_percentage >= 65
                    ? "high"
                    : this.fe_percentage >= 62 && this.fe_percentage < 65
                        ? "medium"
                        : "low"
            );
            formData.append("quantity", this.quantity);
            formData.append("sample_image", this.sample_image);
            formData.append("mine_lap_report", this.mine_lap_report);
            await axios({
                method: "post",
                url: "/api/registration/mined_batch",
                data: formData,
            })
                .then((res) => {
                    open_alert_box(res.data.message, res.data.type);
                    if (res.status === 200) {
                        this.type_of_ore = "";
                        this.fe_percentage = 0;
                        this.quantity = 0;
                        this.sample_image = "";
                        this.mine_lap_report = "";
                    }
                })
                .catch((err) => {
                    open_alert_box(err.response.data.message, err.response.data.type);
                });
            useValidationStore().isButtonLoading = false;
        },
    },
});
