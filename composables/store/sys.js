import { defineStore } from 'pinia'
import $http from "@/utils/http.js";
import { GlobalSetting } from '../model/sys'

export const useSysStore = defineStore('sys', {
    state: () => ({
        globalSetting: {
            website: {
                name: "",
                cover: ""
            },
            profile: {
                name: 'ldh',
                avatar: ""
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