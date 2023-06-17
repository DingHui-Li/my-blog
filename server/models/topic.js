import mongoose from "mongoose";
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  createTime: {
    type: Number,
    default: Date.now,
  },
  name: String,
  cover: String,
});

export default mongoose.model("Topic", topicSchema);
