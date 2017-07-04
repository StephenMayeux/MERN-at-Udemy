const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
  _id: { type: String, unique: true, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  authors: { type: Array, default: [] },
  thumbnail: { type: String, default: '' }
}, { timestamps: true })

const ModelClass = mongoose.model('book', BookSchema)
module.exports = ModelClass
