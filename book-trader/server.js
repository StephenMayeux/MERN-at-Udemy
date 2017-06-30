const path = require('path')
const http = require('http')
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const app = express()

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/book-trader')

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(logger('combined'))

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log('Express server listening on port', port)
})
