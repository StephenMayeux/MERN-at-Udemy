const express = require('express')
const router = express.Router()
const BarsController = require('../controllers/bars')

const authRequired = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.send({ success: false, msg: 'You are not signed in' })
}

router.get('/search/:location', BarsController.searchForBars)

module.exports = router
