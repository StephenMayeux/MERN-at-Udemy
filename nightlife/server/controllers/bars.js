const fetch = require('isomorphic-fetch')
const _ = require('lodash')

const Bar = require('../models/bars')

exports.searchForBars = (req, res) => {
  const { location } = req.params
  const baseURL = 'https://api.yelp.com/v3/businesses/search?term=bars&location='

  fetch(`${baseURL}${location}`, {
    headers: { 'Authorization': `Bearer ${process.env.ACCESS_TOKEN}` }
  })
  .then(response => response.json())
  .then(({ businesses }) => {
    const barIDs = businesses.map(bar => bar.id)

    Bar.find({ yelp_id: { $in: barIDs } }).lean().exec((err, barsWithPeople) => {
      if (err) return res.send({ success: false, msg: 'error reading db' })

      const bars = businesses.map(bar => {
        // if not match, value is undefined
        const match = _.find(barsWithPeople, (barWithPeople) => {
          return barWithPeople.yelp_id === bar.id
        })
        bar.visitors = match ? match.visitors : []
        return bar
      }, [])

      res.send({ success: true, bars })
    })
  })
  .catch(error => res.send({ success: false, msg: 'error fetching bars', error }))
}

exports.toggleVisit = (req, res) => {
  const { id } = req.params
  Bar.findOne({ yelp_id: id }, (err, bar) => {
    if (err) return res.send({ success: false, msg: 'Error reading db', err })

    if (!bar) {
      const newBar = new Bar({
        yelp_id: id,
        visitors: [req.user._id.toString()]
      })
      newBar.save(err => {
        if (err) return res.send({ success: false, msg: 'error writing to db', err })
        return res.send({ success: true, msg: 'success adding bar', bar: newBar })
      })
    }
    else {

      if (_.includes(bar.visitors, req.user._id.toString())) {
        const visitors = _.without(bar.visitors, req.user._id.toString())
        bar.visitors = visitors
      }
      else {
        const visitors = _.concat(bar.visitors, req.user._id.toString())
        bar.visitors = visitors
      }
      bar.save(err => {
        if (err) return res.send({ success: false, msg: 'error updating record' })
        res.send({ success: true, msg: 'success updating bar', bar })
      })
    }
  })
}
