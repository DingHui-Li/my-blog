import { defineStore } from 'pinia'
import $http from "@/utils/http.js";

export const useSysStore = defineStore('sys', {
    state: () => ({
        globalSetting: {
            website: {
                name: "",
                cover: ""
            },
            profile: {
                name: 'ldh',
                avatar: "",
                brithday: ''
            }
        }
    }),
    actions: {
        getData() {
            return $http.get('/api/sys/setting').then(res => {
                if (res?.data) {
                    this.globalSetting = res.data
                }
                return res
            })
        }
    }
})