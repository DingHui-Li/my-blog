import mongoose from "mongoose";
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  createTime: {
    type: Number,
    default: Date.now,
  },
  updateTime: {
    type: Number,
    default: Date.now,
  },
  title: String,
  topics: {
    type: Array,
    ref: "Topic",
  },
  type: {
    type: String,
    default: "article"
  },//article,moment,photo
  cover: String,
  htmlContent: String,
  textContent: String,
  desc: String,
  location: Object,
  imgs: {
    type: Array,
    default: []
  },
  sounds: {
    type: Array,
    default: []
  },
  weather: Object,
  movie: Object,
  onlySelf: Boolean,
  ai: Object,//{model,content}
  mood: Object,//{ "score": "9",
  // "emoji": "😃",
  // "keywords": ["遗憾", "回忆", "爱情"],
  // "desc":"一周内情绪如落叶起伏",
  // "sentiment": "消极",
  // "implicit":""}
});
articleSchema.index({ "$**": "text" });
export default mongoose.model("Article", articleSchema);
