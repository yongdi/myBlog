import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const noteSchema = new Schema({
    key: String,
    message: String,
}, { versionKey: false });
module.exports = mongoose.model('note', noteSchema);
