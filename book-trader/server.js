require('dotenv').config()
const path = require('path')
const http = require('http')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/book-trader')

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(logger('combined'))
app.use(bodyParser.json({ type: '*/*' }))
app.use(cors())

const routes = require('./routes')
app.use('/', routes)

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log('Express server listening on port', port)
})
