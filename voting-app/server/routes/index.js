const express = require('express')
const router = express.Router()

router.use('/polls', require('./polls'))  

router.get('/', (req, res) => {
  res.send({ success: true, msg: 'Successful root route' })
})

module.exports = router
