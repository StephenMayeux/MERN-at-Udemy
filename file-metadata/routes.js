module.exports = (app) => {

  app.get('/', (req, res) => {
    res.render('form', { fileSize: 0 })
  })

}
