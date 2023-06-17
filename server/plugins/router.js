import { createRouter } from "h3";
import {
  getTopicList,
  addTopic,
  deleteTopic,
  editTopic,
  getTopic,
} from "../api/topic.js";
import { uploadFile } from "../api/file.js";
import {
  addArticle,
  editArticle,
  getArticle,
  getArticleList,
  getSameArticleList,
  searchArticleList,
} from "../api/article.js";
const router = createRouter();

router.get("/api/topic", getTopicList);
router.get("/api/topic/:id", getTopic);
router.post("/api/topic", addTopic);
router.put("/api/topic", editTopic);
router.delete("/api/topic/:id", deleteTopic);

router.get("/api/article", getArticleList);
router.get("/api/article/:id", getArticle);
router.get("/api/article/:id/same", getSameArticleList);
router.get("/api/article/search", searchArticleList);
router.post("/api/article", addArticle);
router.put("/api/article", editArticle);

router.post("/api/file/upload", uploadFile);

export default defineNitroPlugin((nitroApp) => {
  nitroApp.h3App.stack.unshift({ route: "/", ...router });
});
