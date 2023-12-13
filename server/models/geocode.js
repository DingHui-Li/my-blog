import mongoose from "mongoose";
const Schema = mongoose.Schema;

const geocodeSchema = new Schema({
    name: String,
    lat: String,
    lon: String,
    raw: Object
});

export default mongoose.model("Geocode", geocodeSchema);