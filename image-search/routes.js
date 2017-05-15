const GoogleImages = require('google-images')
const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY)
const Search = require('./models/search')

module.exports = (app) => {
  app.get('/search/:term', (req, res) => {
    const { term } = req.params
    const page = req.query.page ? parseInt(req.query.page, 10) : 1
    const options = { type: 'photo', page }

    const search = new Search({ term })
    search.save(err => {
      if (err) return res.send({ success: false, msg: 'Error writing to server' })
      client.search(term, options)
        .then(images => {
          images = images.map(({ url, description, parentPage }) => {
            return { url, description, parentPage }
          })
          if (req.query.view === '1') {
            return res.render('search', { images })
          }
          res.send({ success: true, images })
        })
        .catch(error => {
          res.send({ success: false, error })
        })
    })
  })

  app.get('/latest', (req, res) => {
    Search.find({}).sort({ createdAt: -1 }).limit(10).exec((err, searches) => {
      if (err) return res.send({ success: false, msg: 'Error reading search history' })
      if (req.query.view === '1') {
        return res.render('latest', { searches })
      }
      res.send({ success: true, searches })
    })
  })
}
