const passport = require('passport')
const express = require('express')
const router = express.Router()

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.send({ success: false, msg: 'You are not signed in' })
}

router.get('/', (req, res) => {
  res.send({ success: true, msg: 'This is the root route' })
})

router.get('/protected', isLoggedIn, (req, res) => {
  res.send({ msg: 'The secret is cats!' })
})

router.get('/auth/twitter', passport.authenticate('twitter'))
router.get('/auth/twitter/callback', passport.authenticate('twitter'), (req, res) => {
  res.send({ success: true, msg: 'signed in', user: req.user })
})
router.get('/logout', (req, res) => {
  req.logout();
  res.send({ success: true, msg: 'You have signed out' })
});

module.exports = router
