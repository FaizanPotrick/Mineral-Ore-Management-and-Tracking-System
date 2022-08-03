import { defineStore } from "pinia";
import axios from "axios";
import Buttons from "@/assets/json/Buttons.json";

export default defineStore({
    id: "dashboard",
    state: () => ({
        auth_value: false,
        button_value: [],
        card_value: [],
    }),
    actions: {
        button_check() {
            Buttons.map((button) => {
                for (const user_type of button.type_of_user) {
                    if (user_type === $cookies.get('type_of_user')) {
                        if ($cookies.get('type_of_user') === "officer") {
                            for (const region_type of button.type_of_region) {
                                if (region_type === $cookies.get('type_of_region')) {
                                    return this.button_value.push(button);
                                }
                            }
                        }
                        else if ($cookies.get('type_of_user') === "organization") {
                            return this.button_value.push(button);
                        }
                        else if ($cookies.get('type_of_user') === "miner") {
                            return this.button_value.push(button);
                        }
                    }
                }
            })
        },
        async auth_fetch(router) {
            await axios.get(
                '/api/type_of_user'
            ).catch(() => router.push('/login'));
            if ($cookies.get('type_of_user') === 'officer') {
                await axios.get(
                    '/api/type_of_region'
                ).catch(() => router.push('/login'));
            }
        },
        auth_check(route) {
            for (const user_type of route.meta.type_of_user) {
                if (user_type === $cookies.get('type_of_user')) {
                    if ($cookies.get('type_of_user') === "officer") {
                        for (const region_type of route.meta.type_of_region) {
                            if (region_type === $cookies.get('type_of_region')) {
                                return true
                            }
                        }
                        return false
                    }
                    else if ($cookies.get('type_of_user') === "organization") {
                        return true
                    }
                    else if ($cookies.get('type_of_user') === "miner") {
                        return true
                    }
                    else {
                        return false
                    }
                }
            }
            return false
        }
    }
});