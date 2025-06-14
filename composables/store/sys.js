import { defineStore } from "pinia";
import $http from "@/utils/http.js";
import { marked } from 'marked'

export const useSysStore = defineStore("sys", {
  state: () => ({
    token: "",
    sideMenu: [
      {
        label: "动态",
        key: "",
      },
      {
        label: "文章",
        key: "article",
      },
      {
        label: "相册",
        key: "photo",
      },
      {
        label: "足迹",
        key: "footprint",
        path: "footprint",
      },
      {
        label: "电影",
        key: "movie",
        path: "movie",
      },
      {
        label: "统计",
        key: "statist",
        path: "other/statist",
      },
      // {
      //   label: "友链",
      //   key: "friend",
      //   path: "other/friendLink",
      // },
      // {
      //     label: "话题",
      //     key: "topic",
      //     path: "topic",
      // },
      // {
      //     label: "关于",
      //     path: "about",
      //     key: "about"
      // },
      {
        label: "杂乱无章",
        path: "other",
        key: "other",
      },
    ],
    globalSetting: {
      website: {
        name: "",
        cover: "",
        about: "",
        aboutme: "",
      },
      profile: {
        name: "ldh",
        avatar: "",
        brithday: "",
      },
    },
    theme: "light", //dark
    themeColor: "#3f51b5",
    beian: "陕ICP备2024039659号-1",
    analyMyBlog: {
      loading: false,
      model: "",
      content: "",
      time: "",
      hasUpdate: false
    },
    nearWeekMood: {
      data: {},
      model: "",
      time: ""
    }
  }),
  actions: {
    isMobile() {
      if (process.client) {
        const userAgent = navigator.userAgent;
        const mobileKeywords = [
          "Mobile",
          "Android",
          "iPhone",
          "iPad",
          "Windows Phone",
        ];

        for (let i = 0; i < mobileKeywords.length; i++) {
          if (userAgent.indexOf(mobileKeywords[i]) !== -1) {
            return true;
          }
        }
      }
      return false;
    },
    init() {
      if (process.client) {
        this.setToken(window.localStorage["token"] || "");
        this.changeTheme(window.localStorage["theme"] || "light");
        this.changeThemeColor(window.localStorage["themeColor"] || "#3f51b5");
        this.getAnalyMyBlog()
        this.analyMoodByNearWeek()
      }
    },
    login(params = {}) {
      return $http.post("/api/login", params).then((res) => {
        this.setToken(res.data?.token || "");
      });
    },
    logout() {
      console.log("logout");
      this.setToken("");
      navigateTo({ path: "/admin/login" }, { replace: true });
    },
    setToken(token) {
      this.token = token;
      if (process.client) {
        window.localStorage["token"] = token;
      }
    },
    isLogin() {
      if (process.client) {
        return Boolean(window.localStorage["token"]);
      }
      return false;
    },
    getData() {
      return $http.get("/api/sys/setting").then((res) => {
        if (res?.data) {
          this.globalSetting = res.data;
        }
        return res;
      });
    },
    changeGlobalSetting(config) {
      this.globalSetting = config;
    },
    changeTheme(theme) {
      this.theme = theme;
      if (process.client) {
        window.localStorage["theme"] = theme;
      }
    },
    pushLog() {
      if (process.client) {
        // return
        if (!window.location.href.includes("localhost")) {
          $http.post("/api/log/push", {
            ip: window.ip,
            url: window.location.href,
            ua: window.navigator.userAgent
          });
        }
      }
    },
    changeThemeColor(color) {
      if (color) {
        this.themeColor = color;
        if (process.client) {
          window.localStorage["themeColor"] = this.themeColor;
        }
      }
      if (process.client) {
        document.documentElement.style.setProperty(
          "--primary-color",
          this.themeColor
        );
        document.documentElement.style.setProperty(
          "--el-color-primary",
          this.themeColor
        );
      }
    },
    getAnalyMyBlog() {
      try {
        this.analyMyBlog.time = Number(window.localStorage["analyMyBlogTime"])
      } catch { }
      try {
        this.analyMyBlog.loading = true
        $http.get("/api/sys/analyMyBlog").then(res => {
          res.data.content = marked(res.data.content)
          if (this.analyMyBlog.time != res.data.time) {
            window.localStorage['checkedAnalyMyBlog'] = 'false'
          }
          this.analyMyBlog = {
            ...this.analyMyBlog,
            ...res.data,
            hasUpdate: this.analyMyBlog.time != res.data.time || window.localStorage['checkedAnalyMyBlog'] == 'false'
          }
        }).finally(() => {
          this.analyMyBlog.loading = false
          window.localStorage["analyMyBlogTime"] = this.analyMyBlog.time
        })
      } catch { }
    },
    checkedAnalyMyBlog() {
      if (process.client) {
        window.localStorage['checkedAnalyMyBlog'] = 'true'
        this.analyMyBlog.hasUpdate = false
        window.localStorage["analyMyBlogTime"] = this.analyMyBlog.time
      }
    },
    analyMoodByNearWeek() {
      $http.get("/api/sys/analyMoodByNearWeek").then(res => {
        res.data.content = res.data.content.replace("```json", '').replace("```", '')
        res.data.data = JSON.parse(res.data.content)
        this.nearWeekMood = res.data
      })
    }
  },
});
