import { createRouter } from "h3";
import {
  getTopicList,
  addTopic,
  deleteTopic,
  editTopic,
  getTopic,
} from "../api/topic.js";
import { uploadFile } from "../api/file.js";
// import {
//   addArticle,
//   editArticle,
//   getArticle,
//   getArticleList,
//   getSameArticleList,
//   searchArticleList,
//   deleteArticle
// } from "../api/article.js";
import { getGlobalSetting, setGlobalSetting } from '../api/sys.js'
import { test } from '../api/money.js'
// import * as LogApi from '../api/log.js'

const router = createRouter();

router.get("/api/topic", getTopicList);
router.get("/api/topic/:id", getTopic);
router.post("/api/topic", addTopic);
router.put("/api/admin/topic", editTopic);
router.delete("/api/admin/topic/:id", deleteTopic);

// router.get("/api/article", getArticleList);
// router.get("/api/article/:id", getArticle);
// router.get("/api/article/:id/same", getSameArticleList);
// router.get("/api/article/search", searchArticleList);
// router.post("/api/admin/article", addArticle);
// router.put("/api/admin/article", editArticle);
// router.delete("/api/admin/article/:id", deleteArticle);

router.post("/api/admin/file/upload", uploadFile);

router.get("/api/sys/setting", getGlobalSetting);
router.post("/api/admin/sys/setting", setGlobalSetting);

router.get("/api/money/test", test);

// router.get("/api/log", LogApi.get);

export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.h3App.stack.unshift({
    route: "/",
    handler: router.handler
  });
});
