const Url = require('./models/url')
const validator = require('validator')
const shortid = require('shortid')

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.render('index')
  })

  app.get('/goto/:short_id', (req, res) => {
    const { short_id } = req.params
    Url.findOne({ short_id }, (err, result) => {
      if (err) return res.send({ success: false, msg: 'Error reading from db' })
      if (!result) return res.send({ success: false, msg: 'Short id does not exist' })

      if (result.original_url.startsWith('http')) return res.redirect(result.original_url)
      res.redirect(`http://${result.original_url}`)
    })
  })

  app.get('/create/*?', (req, res) => {
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
}
