const express = require('express')
const app = express()
const mongoose = require('mongoose')
const validator = require('validator')
const shortid = require('shortid')

mongoose.connect('mongodb://localhost/shorturl')

app.get('/', (req, res) => {
  res.send('Hey hey!')
})

app.get('/*?', (req, res) => {
  const url = req.params[0]
  if (validator.isURL(url)) {
    return res.send({
      original_url: url,
      short_url: `localhost:3000/${shortid.generate()}`
    })
  } else {
    res.send({
      success: false,
      msg: 'Invalid URL'
    })
  }
})

const port = 3000
app.listen(port, () => {
  console.log('Server running on port', port)
})
