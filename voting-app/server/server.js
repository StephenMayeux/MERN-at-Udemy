require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const routes = require('./routes')
routes(app)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/voting-app')

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Running on port', port)
})
