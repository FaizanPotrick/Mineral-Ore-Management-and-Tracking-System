import { defineStore } from "pinia";
import useAlertStore from "../Alert";
import useValidationStore from "../Validation";
const { open_alert_box, open_alert_text } = useAlertStore();

export default defineStore({
    id: "ore_transaction",
    state: () => ({
        amount_of_ore: {
            value: "",
            valid: true,
            regex: /^([0-9]+)$/,
            message: "Amount must be numeric",
        },
        type_of_ore: {
            value: "",
            valid: true,
            regex: /^([ a-zA-Z]+)$/,
            message: "Name must be alphabetic",
        },
        grade: {
            value: "",
            valid: true,
            regex: /^([0-9]+)\%$/,
            message: "Grade must be in percentage",
        },
        price: {
            value: "",
            valid: true,
            regex: /^([0-9]+)$/,
            message: "Price must be numeric",
        },
    }),
    actions: {
        async register_fn() {
            if (
                !this.amount_of_ore.value < 0 ||
                !this.type_of_ore.valid ||
                !this.grade.valid ||
                !this.price.value < 0
            ) {
                open_alert_text(
                    "Please fill all the required fields correctly",
                    "error"
                );
                return;
            }
            open_alert_text("", "");
            useValidationStore().isLoading = true;
            const res = await fetch("/api/registration/transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transaction_id: this.transaction_id,
                    mine_id: this.mine_id,
                    buyer_org_id: this.buyer_org_id,
                    amount_of_ore: this.amount_of_ore.value,
                    type_of_ore: this.type_of_ore.value,
                    grade: this.grade.value,
                    price: this.price.value,
                }),
            });
            const data = await res.json();
            useValidationStore().isLoading = false;
            open_alert_box(data.message, data.type);
            if (res.status === 200) {
                this.transaction_id = "";
                this.mine_id = "";
                this.buyer_org_id = "";
                this.amount_of_ore.value = "";
                this.type_of_ore.value = "";
                this.grade.value = "";
                this.price.value = "";
            }
        },
    },
});
