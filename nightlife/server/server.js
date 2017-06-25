require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const express = require('express')
const passport = require('passport')

const app = express()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nightlife')

app.use(cors())
app.use(logger('combined'))
app.use(bodyParser.json({ type: '*/*' }))

const routes = require('./routes')
app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Running on port', port)
})
