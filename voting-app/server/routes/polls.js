const express = require('express')
const router = express.Router()
const PollController = require('../controllers/polls')

router.get('/', PollController.home)
router.get('/all', PollController.fetchAllPolls)
router.get('/user/:id', PollController.fetchUserPolls)
router.get('/vote/:id', PollController.fetchOnePoll)

router.post('/create', PollController.createNewPoll)

module.exports = router
