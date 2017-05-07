const useragent = require('express-useragent')
const express = require('express')
const app = express()

app.use(useragent.express())

app.get('/', (req, res) => {
  const ip = req.ip
  const language = req.headers['accept-language'].split(',')[0]
  const os = req.useragent.platform
  res.send({
    ip,
    language,
    os
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server running on port', 3000)
})
