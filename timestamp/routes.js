const moment = require('moment')

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.render('index', {
      natural: moment().format('MMMM DD, YYYY'),
      unix: moment().format('x')
    })
  })

  app.get('/:time', (req, res) => {
    const { time } = req.params

    if (!isNaN(time)) {
      return res.send({
        unix: time,
        natural: moment(parseInt(time, 10)).format('MMMM DD, YYYY')
      })
    } else if (moment(time).isValid()) {
      return res.send({
        unix: moment(time).format('x'),
        natural: time
      })
    }

    res.send({ unix: null, natural: null })
  })
}
