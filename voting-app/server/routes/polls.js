const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send({ success: true, msg: 'Success in poll router' })
})

module.exports = router
