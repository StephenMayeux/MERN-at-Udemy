const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send({ success: true, msg: 'This is the root route' })
})

module.exports = router
