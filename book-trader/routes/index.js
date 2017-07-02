const Authentication = require('../controllers/users')
const passportService = require('../services/passport')
const passport = require('passport')
const express = require('express')
const router = express.Router()

// Authentication Routes and Middleware
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })

router.post('/signin', requireSignin, Authentication.signin)
router.post('/signup', Authentication.signup)
router.get('/secret', requireAuth, (req, res) => {
  res.send({ secret: 'mayosammy' })
})

module.exports = router
