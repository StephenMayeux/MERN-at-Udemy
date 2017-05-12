const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const routes = require('./routes')
routes(app)

mongoose.connect('mongodb://localhost/shorturl')

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const port = 3000
app.listen(port, () => {
  console.log('Server running on port', port)
})
