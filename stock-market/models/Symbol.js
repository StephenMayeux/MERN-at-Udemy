const mongoose = require('mongoose')
const Schema = mongoose.Schema

const symbolSchema = new Schema({
  symbol: { type: String, unique: true, uppercase: true }
})

const ModelClass = mongoose.model('symbol', symbolSchema)
module.exports = ModelClass
