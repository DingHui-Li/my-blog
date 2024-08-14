import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
    key: String,
    value: Object,
    time: {
        type: Number,
        default: Date.now,
    }
});

export default mongoose.model("cache", schema);