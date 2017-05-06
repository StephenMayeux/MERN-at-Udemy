const express = require('express')
const moment = require('moment')
const app = express()

app.get('/:time', (req, res) => {
  const { time } = req.params

  if (!isNaN(time)) {
    return res.send({
      unix: time,
      natural: moment(parseInt(time, 10)).format('MMMM DD, YYYY')
    })
  }

  res.send({ unix: null, natural: null })
})

const port = 3000
app.listen(port, () => {
  console.log('Express server running on port', port);
})
