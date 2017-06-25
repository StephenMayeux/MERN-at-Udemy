const path = require('path')
const http = require('http')
const express = require('express')
const app = express()

const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log('Express server listening on port', port)
})
