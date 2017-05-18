const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pollSchema = new Schema({
  title: String,
  createdBy: String,
  votes: Array
}, { timestamps: true })

const ModelClass = mongoose.model('poll', pollSchema)
module.exports = ModelClass
