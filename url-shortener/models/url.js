const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  original_url: String,
  short_id: String
})

const ModelCalss = mongoose.model('url', urlSchema)
module.exports = ModelCalss
