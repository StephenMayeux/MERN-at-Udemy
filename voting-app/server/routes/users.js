const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send({ success: true, msg: 'Success in user router' })
})

module.exports = router
