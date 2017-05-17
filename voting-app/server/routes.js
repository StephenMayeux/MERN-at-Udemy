module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ success: true, msg: 'Server is up and running!' })
  })
}
