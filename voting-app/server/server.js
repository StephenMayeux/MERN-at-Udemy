require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const jwt = require('express-jwt')
const express = require('express')

const app = express()
const jwtCheck = jwt({ secret: process.env.APP_SECRET })

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/voting-app')

app.use(cors())
app.use(logger('combined'))
app.use(bodyParser.json({ type: '*/*' }))
app.use(jwtCheck.unless({
  method: 'GET',
  path: /^\/polls\/vote\/[A-Za-z0-9-_]*/ 
}))

const routes = require('./routes')
app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Running on port', port)
})
