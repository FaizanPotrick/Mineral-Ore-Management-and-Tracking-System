import { defineStore } from "pinia";


export default defineStore({
    id: "dashboard",
    state: () => ({
        auth_value: false,
        button_value: [],
        button_check: [{
            name: "Home",
            svg: "@/assets/icons/file.svg",
            router_link: "/officer_dashboard",
            type_of_user: "officer",
            type_of_region: ["country", "state", "district"],
        },
        {
            name: "Officer Registration",
            svg: "@/assets/icons/file.svg",
            router_link: "/officer_registration",
            type_of_user: "officer",
            type_of_region: ["country", "state"],
        },
        {
            name: "Home",
            svg: "@/assets/icons/file.svg",
            router_link: "/organization_dashboard",
            type_of_user: "organization",
        },
        {
            name: "Transaction",
            svg: "@/assets/icons/file.svg",
            router_link: "/transaction",
            type_of_user: "organization",
        },
        {
            name: "New Manager Registration",
            svg: "@/assets/icons/file.svg",
            router_link: "/new_registration",
            type_of_user: "organization",
        },
        {
            name: "Miner Registration",
            svg: "@/assets/icons/file.svg",
            router_link: "/miner_registration",
            type_of_user: "officer",
            type_of_region: ["district"],
        },
        {
            name: "Batch Check",
            svg: "@/assets/icons/file.svg",
            router_link: "/batch_check",
            type_of_user: "officer",
            type_of_region: ["district"],
        },
        {
            name: "Miner Dashboard",
            svg: "@/assets/icons/file.svg",
            router_link: "/miner_dashboard",
            type_of_user: "miner",
            type_of_region: ["district"],
        },
        {
            name: "Create Batch",
            svg: "@/assets/icons/file.svg",
            router_link: "/ores_registration",
            type_of_user: "miner",
            type_of_region: ["district"],
        },
        {
            name: "Ores Registration",
            svg: "@/assets/icons/file.svg",
            router_link: "/ores_registration",
            type_of_user: "miner",
            type_of_region: ["district"],
        },
        {
            name: "Logs",
            svg: "@/assets/icons/file.svg",
            router_link: "/minebatch",
            type_of_user: "miner",
            type_of_region: ["country", "state", "district"],
        },
        ]
    }),
    actions: {
        button_check_fn() {
            this.button_check.map((button) => {
                if (button.type_of_user === $cookies.get("type_of_user")) {
                    this.button_value.push(button)
                }
            })
        },
        async auth_check(router) {
            const user_res = await fetch('/api/type_of_user')
            if (user_res.status !== 200) {
                router.push('/login')
            }
            else if ($cookies.get('type_of_user') === 'officer') {
                const region_res = await fetch('/api/type_of_region')
                if (region_res.status !== 200) {
                    router.push('/login')
                }
            }
        },
        getAuthRegionData(route) {
            if (route.meta.type_of_user === $cookies.get('type_of_user')) {
                if ($cookies.get('type_of_user') === "officer") {
                    for (const region_type of route.meta.type_of_region) {
                        if (region_type === $cookies.get('type_of_region')) {
                            this.auth_value = true
                            break;
                        }
                        this.auth_value = false
                    }
                } else {
                    this.auth_value = true
                }
            }
        }
    }
});