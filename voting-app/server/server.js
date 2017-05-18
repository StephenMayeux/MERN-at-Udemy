require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const express = require('express')
const app = express()

const routes = require('./routes')
app.use('/', routes)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/voting-app')

app.use(cors())
app.use(logger('combined'))
app.use(bodyParser.json('*/*'))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Running on port', port)
})
