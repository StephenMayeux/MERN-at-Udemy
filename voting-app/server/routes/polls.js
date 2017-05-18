const express = require('express')
const router = express.Router()
const PollController = require('../controllers/polls')

router.get('/', PollController.home)

module.exports = router
