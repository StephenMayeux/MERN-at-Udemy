const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BarSchema = new Schema({
  yelp_id: String,
  visitors: { type: Array, default: [] }
}, { timestamps: true })

const ModelClass = mongoose.model('bar', BarSchema)
module.exports = ModelClass
