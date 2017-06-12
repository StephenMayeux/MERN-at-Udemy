const passportService = require('../services/passport');
const passport = require('passport')
const express = require('express')
const router = express.Router()
const BarsController = require('../controllers/bars')

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/search/:location', BarsController.searchForBars)
router.post('/visit/:id', requireAuth, BarsController.toggleVisit)

module.exports = router
