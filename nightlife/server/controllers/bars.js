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
          return barWithPeople.twitter_id === bar.id
        })
        bar.visitors = match ? match.visitors : []
        return bar
      }, [])

      res.send({ success: true, bars })
    })
  })
  .catch(error => res.send({ success: false, msg: 'error fetching bars', error }))
}
