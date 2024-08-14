import { createRouter } from "h3";
import {
  getTopicList,
  addTopic,
  deleteTopic,
  editTopic,
  getTopic,
  stTopic
} from "../api/topic.js";
import { uploadFile, downloadFileBase64 } from "../api/file.js";
import {
  addArticle,
  editArticle,
  getArticle,
  getArticleList,
  getSameArticleList,
  searchArticleList,
  deleteArticle,
  searchMovie,
  stArticleByDate,
  getContentById
} from "../api/article.js";
import { getGlobalSetting, setGlobalSetting, login, getTOTPQR } from '../api/sys.js'
import { test } from '../api/money.js'
import * as LogApi from '../api/log.js'
import * as StApi from '../api/st.js'

const router = createRouter();

// router.options("/**", defineEventHandler(event => 'options request'))

router.get("/api/topic", getTopicList);
router.get("/api/topic/st", stTopic);
router.get("/api/topic/:id", getTopic);
router.post("/api/admin/topic", addTopic);
router.put("/api/admin/topic", editTopic);
router.delete("/api/admin/topic/:id", deleteTopic);

router.get("/api/article", getArticleList);
router.post("/api/articleById", getContentById);
router.get("/api/article/st/date", stArticleByDate);
router.get("/api/admin/articleList", getArticleList);
router.get("/api/article/:id", getArticle);
router.get("/api/article/:id/same", getSameArticleList);
router.get("/api/article/search", searchArticleList);
router.post("/api/admin/article", addArticle);
router.put("/api/admin/article", editArticle);
router.delete("/api/admin/article/:id", deleteArticle);
router.get("/api/admin/searchmovie", searchMovie);

router.post("/api/admin/file/upload", uploadFile);
router.get("/api/admin/file/downloadBase64", downloadFileBase64);

router.get("/api/getTOTPQR", getTOTPQR);
router.post("/api/login", login);
router.get("/api/sys/setting", getGlobalSetting);
router.post("/api/admin/sys/setting", setGlobalSetting);

router.get("/api/money/test", test);

router.get("/api/log", LogApi.get);
router.get("/api/log/st", LogApi.st);
router.post("/api/log/push", LogApi.push);

router.get("/api/st/contentNumByProvince", StApi.stContentNumByProvince);
router.get("/api/st/findRegionOfCity", StApi.findRegionOfCity);
router.post("/api/st/findRegionOfDistrict", StApi.findRegionOfDistrict);

export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.h3App.stack.unshift({
    route: "/",
    handler: fromNodeMiddleware(router.handler)
  });
});
