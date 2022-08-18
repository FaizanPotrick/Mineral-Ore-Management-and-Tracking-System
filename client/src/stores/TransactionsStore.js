import { defineStore } from "pinia";
import axios from "axios";
import useAlertStore from "./Alert";
import useValidationStore from "./Validation";
const { open_alert_box, isAlert_text } = useAlertStore();

export default defineStore({
    id: "transaction_store",
    state: () => ({
        transactions: [],
        organisations: [],
        organisation_id: "",
        type_of_ore: "",
        fe_percentage: 0,
        quantity: 0,
        price: 0,
        invoice: {}
    }),
    actions: {
        async get_transaction() {
            const { data } = await axios.get(
                `/api/transactions/${$cookies.get("type_of_user") === "officer"
                    ? `officer/district`
                    : "miner"
                }`
            );
            this.transactions = data;
        },
        invoice_document(event) {
            this.invoice = event.target.files[0];
        },
        async transaction_register_fn() {
            if (this.fe_percentage <= 0 || this.quantity <= 0 || this.price <= 0) {
                isAlert_text(true);
                return;
            }
            isAlert_text(false);
            useValidationStore().isButtonLoading = true;
            const formData = new FormData();
            formData.append("organisation_id", this.organisation_id);
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
            formData.append("price", this.price);
            formData.append("invoice", this.invoice);
            await axios({
                method: "post",
                url: "/api/registration/transaction",
                data: formData,
            })
                .then((res) => {
                    open_alert_box(res.data.message, res.data.type);
                    if (res.status === 200) {
                        this.organisation_id = "";
                        this.type_of_ore = "";
                        this.fe_percentage = 0;
                        this.quantity = 0;
                        this.price = 0;
                        this.invoice = {};
                    }
                })
                .catch((err) => {
                    open_alert_box(err.response.data.message, err.response.data.type);
                });
            useValidationStore().isButtonLoading = false;
        },
    },
});
