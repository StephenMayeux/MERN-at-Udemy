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

// Load Other Routes
router.use('/books', require('./books'))
router.use('/user', require('./user'))

module.exports = router
