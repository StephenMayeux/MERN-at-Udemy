const GoogleImages = require('google-images')
const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY)

module.exports = (app) => {
  app.get('/search/:term', (req, res) => {
    const { term } = req.params
    client.search(term, { type: 'photo' })
      .then(images => {
        res.send({ success: true, images })
      }).
      catch(error => {
        res.send({ success: false, error })
      })
  })
}
