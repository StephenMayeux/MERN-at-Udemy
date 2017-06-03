const express = require('express')
const router = express.Router()
const PollController = require('../controllers/polls')

router.get('/', PollController.home)
router.get('/all', PollController.fetchAllPolls)
router.get('/vote/:id', PollController.fetchOnePoll)
router.post('/vote/:id', PollController.voteOnPoll)
router.post('/create', PollController.createNewPoll)
router.put('/edit/:id', PollController.addOptionToPoll)
router.delete('/delete/:id', PollController.deletePoll)

module.exports = router
