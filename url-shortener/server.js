const express = require('express')
const app = express()
const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://localhost/shorturl')

app.get('/', (req, res) => {
  res.send('Hey hey!')
})

const port = 3000
app.listen(port, () => {
  console.log('Server running on port', port)
})
