const Polls = require('../models/poll')

exports.home = (req, res) => {
  res.send({ success: true, msg: 'Success in poll router' })
}

exports.fetchAllPolls = (req, res) => {
  Polls.find({}, (err, polls) => {
    if (err) return res.send({ success: false, msg: 'Error reading from database' })
    res.send({ success: true, polls })
  })
}

exports.fetchUserPolls = (req, res) => {
  Polls.find({ createdBy: req.params.id }, (err, polls) => {
    if (err) return res.send({ success: false, msg: 'Error reading from database' })
    res.send({ success: true, polls })
  })
}

exports.fetchOnePoll = (req, res) => {
  Polls.findOneById(req.params.id, (err, poll) => {
    if (err) return res.send({ success: false, msg: 'Error reading from database' })
    if (!poll) return res.send({ success: false, msg: 'This poll does not exist' })
    res.send({
      success: true,
      poll
    })
  })
}

exports.createNewPoll = (req, res) => {
  const { title, createdBy, options } = req.body
  const results = options.reduce((acc, option) => {
    acc[option] = 0
    return acc
  }, {})

  const newPoll = new Poll({
    title,
    createdBy,
    results,
    votedBy: []
  })

  newPoll.save(err => {
    if (err) return res.send({ success: false, msg: 'Error saving to db' })
    res.send({
      success: true,
      poll: newPoll
    })
  })
}
