const express = require('express')
const app = express()
const mongoose = require('mongoose')
const validator = require('validator')
const shortid = require('shortid')

const Url = require('./models/url')

mongoose.connect('mongodb://localhost/shorturl')

app.get('/', (req, res) => {
  res.send('Hey hey!')
})

app.get('/*?', (req, res) => {
  const url = req.params[0]
  if (validator.isURL(url)) {
    Url.findOne({ original_url: url }, (err, result) => {
      if (err) return res.send({ success: false, msg: 'Error reading from db' })
      if (result) {
        const { original_url, short_id } = result
        return res.send({
          success: true,
          original_url,
          short_url: `localhost:3000/goto/${short_id}`
        })
      }
      const newUrl = new Url({
        original_url: url,
        short_id: shortid.generate()
      })

      newUrl.save(err => {
        if (err) return res.send({ success: false, msg: 'Error saving to db' })
        res.send({ success: true, original_url: url, short_url: `localhost:3000/goto/${newUrl.short_id}` })
      })
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
