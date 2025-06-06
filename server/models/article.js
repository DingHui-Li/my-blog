import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Mood = new Schema({
  score: Number,
  emoji: String,
  keywords: Array,
  desc: String,
  sentiment: String,
  implicit: String,
  food: String,
});

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
  mood: Mood,
});
articleSchema.index({ "$**": "text" });
export default mongoose.model("Article", articleSchema);
