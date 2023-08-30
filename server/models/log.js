import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sysSchema = new Schema({
    ip: String,
    ua: String,
    url: String,
    time: {
        type: Number,
        default: Date.now,
    }
});

export default mongoose.model("Log", sysSchema);