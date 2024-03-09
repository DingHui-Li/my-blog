import { defineStore } from 'pinia'
import $http from "@/utils/http.js";

export const useSysStore = defineStore('sys', {
    state: () => ({
        token: 'testToken',
        sideMenu: [
            {
                label: "动态",
                key: ""
            },
            {
                label: "文章",
                key: "article"
            },
            {
                label: "相册",
                key: "photo"
            },
            {
                label: "关于",
                path: "about",
                key: "about"
            },
            {
                label: "杂乱无章",
                path: "other",
                key: "other"
            },
        ],
        globalSetting: {
            website: {
                name: "",
                cover: "",
                about: "",
                aboutme: ""
            },
            profile: {
                name: 'ldh',
                avatar: "",
                brithday: ''
            }
        }
    }),
    actions: {
        login(params = {}) {
            return $http.post('/api/login', params).then(res => {
                this.setToken(res.data?.token || "")
            })
        },
        logout() {
            this.setToken("")
            useRouter().replace('/admin/login')
        },
        setToken(token) {
            this.token = token
            window.localStorage['token'] = token
        },
        isLogin() {
            return Boolean(this.token)
        },
        getData() {
            return $http.get('/api/sys/setting').then(res => {
                if (res?.data) {
                    this.globalSetting = res.data
                }
                return res
            })
        },
        changeGlobalSetting(config) {
            this.globalSetting = config
        }
    }
})