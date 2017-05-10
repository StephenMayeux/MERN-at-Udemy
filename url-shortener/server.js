const express = require('express')
const app = express()
const mongoose = require('mongoose')

const routes = require('./routes')
routes(app)

mongoose.connect('mongodb://localhost/shorturl')

const port = 3000
app.listen(port, () => {
  console.log('Server running on port', port)
})
