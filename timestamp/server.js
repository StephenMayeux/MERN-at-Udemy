const path = require('path')
const express = require('express')
const app = express()

const routes = require('./routes')
routes(app)

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Express server running on port', port);
})
