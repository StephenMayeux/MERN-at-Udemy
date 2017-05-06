const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send({
    success: true,
    msg: 'This route is working!'
  })
})

const port = 3000
app.listen(port, () => {
  console.log('Express server running on port', port);
})
