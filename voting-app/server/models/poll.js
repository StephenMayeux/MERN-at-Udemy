const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pollSchema = new Schema({
  title: String,
  createdBy: String,
  votedBy: Array,
  results: Object
}, { timestamps: true })

const ModelClass = mongoose.model('poll', pollSchema)
module.exports = ModelClass
