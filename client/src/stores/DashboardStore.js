import { defineStore } from "pinia";


export default defineStore({
    id: "dashboard",
    state: () => ({
        auth_value: false
    }),
    actions: {
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