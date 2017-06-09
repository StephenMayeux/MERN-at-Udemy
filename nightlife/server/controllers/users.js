const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
}

exports.signin = function(req, res, next) {
  if (req.user.available) {
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
      email,
      password
    });

    user.save(function(err) {
      if (err) { return next(err); }
      return res.json({ success: true, token: tokenForUser(user), user });
    });

  }
  else if (req.user.wrongPassword) {
    return res.send({ success: false, error: 'Wrong password' })
  }
  else {
    res.send({ success: true, token: tokenForUser(req.user), user: req.user });
  }
}
