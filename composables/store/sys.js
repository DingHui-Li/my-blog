import { defineStore } from 'pinia'
import $http from "@/utils/http.js";

export const useSysStore = defineStore('sys', {
    state: () => ({
        token: '',
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
            // {
            //     label: "足迹",
            //     key: "map",
            //     path: "map"
            // },
            {
                label: "电影",
                key: "movie",
                path: "movie"
            },
            {
                label: "话题",
                key: "topic",
                path: "topic",
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
        },
        theme: "light",//dark
    }),
    actions: {
        init() {
            if (process.client) {
                this.setToken(window.localStorage['token'] || "")
                this.changeTheme(window.localStorage['theme'] || 'light')
            }
        },
        login(params = {}) {
            return $http.post('/api/login', params).then(res => {
                this.setToken(res.data?.token || "")
            })
        },
        logout() {
            console.log("logout")
            this.setToken("")
            navigateTo({ path: "/admin/login" }, { replace: true })
        },
        setToken(token) {
            this.token = token
            if (process.client) {
                window.localStorage['token'] = token
            }
        },
        isLogin() {
            if (process.client) {
                return Boolean(window.localStorage['token'])
            }
            return false
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
        },
        changeTheme(theme) {
            this.theme = theme
            if (process.client) {
                window.localStorage['theme'] = theme
            }
        }
    }
})