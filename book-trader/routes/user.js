const express = require('express')
const router = express.Router()

const User = require('../models/user')

const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

router.get('/profile', requireAuth, (req, res) => {
  const { user } = req.user
  res.send({ success: true, user })
})

router.post('/profile', requireAuth, (req, res) => {
  const { name, city, state } = req.body
  User.findByIdAndUpdate(req.user._id, { $set: { name, city, state } }, { new: true}, (err, user) => {
    if (err) return res.status(500).send({ success: false, msg: 'Error updating database' })
    res.send({ success: true, user })
  })
})

module.exports = router
