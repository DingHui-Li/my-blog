import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sysSchema = new Schema({
    ip: String,
    ua: String,
    url: String,
    location: String,
    time: {
        type: Number,
        default: Date.now,
    },
    login: Boolean
});

export default mongoose.model("Log", sysSchema);