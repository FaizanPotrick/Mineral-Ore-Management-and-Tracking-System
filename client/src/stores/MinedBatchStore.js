import { defineStore } from "pinia";
import axios from "axios";
import useAlertStore from "./Alert";
import useValidationStore from "./Validation";
const { open_alert_box, isAlert_text } = useAlertStore();

export default defineStore({
    id: "mined_batch_store",
    state: () => ({
        minded_batches: [],
        type_of_ore: "",
        fe_percentage: 0,
        quantity: 0,
        sample_image: "",
        mine_lap_report: "",
    }),
    actions: {
        async get_mined_batches() {
            const { data } = await axios.get(
                `/api/mined_batches/${$cookies.get("type_of_user") === "officer"
                    ? `officer/district`
                    : "miner"
                }`
            );
            this.minded_batches = data;
        },
        store_image(event) {
            this.sample_image = event.target.files[0];
        },
        store_document(event) {
            this.mine_lap_report = event.target.files[0];
        },
        async ores_register_fn() {
            if (this.fe_percentage <= 0 || this.quantity <= 0) {
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
                        this.sample_image = {};
                        this.mine_lap_report = {};
                    }
                })
                .catch((err) => {
                    open_alert_box(err.response.data.message, err.response.data.type);
                });
            useValidationStore().isButtonLoading = false;
        },
    },
});
