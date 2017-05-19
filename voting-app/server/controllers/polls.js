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

  const newPoll = new Polls({
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

exports.addOptionToPoll = (req, res) => {
  const { id } = req.params
  const { option } = req.body
  Polls.findByIdAndUpdate(id, { $set: { [`results.${option}`]: 0 } }, { new: true }, (err, poll) => {
    if (err) return res.send({ success: false, msg: 'Error writing to database' })
    if (!poll) return res.send({ success: false, msg: 'This poll id does not exist' })
    res.send({
      success: true,
      poll
    })
  })
}

exports.voteOnPoll = (req, res) => {
  const { voter, vote } = req.body
  const { id } = req.params
  Polls.findByIdAndUpdate(id, { $inc: { [`results.${vote}`]: 1 }, $push: { votedBy: voter } }, { new: true }, (err, poll) => {
    if (err) return res.send({ success: false, msg: 'Error updating database' })
    if (!poll) return res.send({ success: false, msg: 'This id does not exist' })
    res.send({
      success: true,
      poll
    })
  })
}

exports.deletePoll = (req, res) => {
  const { id } = req.params
  Polls.findByIdAndRemove(id, err => {
    if (err) return res.send({ success: false, msg: 'error deleting poll' })
    res.send({ success: true, msg: 'poll deleted' })
  })
}
