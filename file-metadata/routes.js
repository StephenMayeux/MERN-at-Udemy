const multer = require('multer')
const upload = multer().single('userFile')

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.render('form', { fileSize: 0 })
  })

  app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) return res.send({ success: false, msg: 'Error uploading to server', err })
      res.render('form', { fileSize: req.file.size })
    })
  })

}
