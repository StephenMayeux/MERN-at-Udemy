const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  twitter_id: String
}, { timestamps: true })

const ModelClass = mongoose.model('user', UserSchema)
module.exports = ModelClass
