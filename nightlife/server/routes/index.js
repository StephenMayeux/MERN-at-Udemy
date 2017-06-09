const Authentication = require('../controllers/users');
const passportService = require('../services/passport');
const passport = require('passport');
const express = require('express')
const router = express.Router()

router.use('/bars', require('./bars'))

router.get('/', (req, res) => {
  res.send({ success: true, msg: 'This is the root route' })
})

// Authenication Routes and Middleware
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.post('/signin', requireSignin, Authentication.signin);

module.exports = router
