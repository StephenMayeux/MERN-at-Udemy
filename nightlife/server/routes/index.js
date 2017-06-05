const passport = require('passport')
const express = require('express')
const router = express.Router()

router.use('/bars', require('./bars'))

router.get('/', (req, res) => {
  res.send({ success: true, msg: 'This is the root route' })
})

// Authenication Routes
router.get('/auth/twitter', passport.authenticate('twitter'))
router.get('/auth/twitter/callback', passport.authenticate('twitter'), (req, res) => {
  res.send({ success: true, msg: 'signed in', user: req.user })
})
router.get('/logout', (req, res) => {
  req.logout();
  res.send({ success: true, msg: 'You have signed out' })
});

module.exports = router
