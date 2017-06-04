const Twitter = require('passport-twitter').Strategy
const User = require('../models/user')

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
  })

  passport.use(new Twitter({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: process.env.CALLBACK
  }, (token, tokenSecret, profile, done) => {
    console.log('TYPEOF PROFILE ID', typeof profile.id)
    User.findOne({ twitter_id: profile.id }, (err, user) => {
      if (err) return done(err)
      if (user) return done(null, user)

      const newUser = new User({ twitter_id: profile.id })
      newUser.save(err => {
        if (err) return done(err)
        done(null, newUser)
      })
    })
  }))

}
