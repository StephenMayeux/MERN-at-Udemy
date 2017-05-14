const GoogleImages = require('google-images')
const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY)

module.exports = (app) => {
  app.get('/search/:term', (req, res) => {
    const { term } = req.params
    const page = req.query.page ? parseInt(req.query.page, 10) : 1
    const options = { type: 'photo', page }

    client.search(term, options)
      .then(images => {
        res.send({ success: true, images })
      }).
      catch(error => {
        res.send({ success: false, error })
      })
  })
}
