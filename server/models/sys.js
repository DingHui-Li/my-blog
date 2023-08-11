import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sysSchema = new Schema({
    key: String,
    value: Object
});

export default mongoose.model("Sys", sysSchema);