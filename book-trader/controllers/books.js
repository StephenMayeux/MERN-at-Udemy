const fetch = require('isomorphic-fetch')
const User = require('../models/user')

const BASE_API_URL = `https://www.googleapis.com/books/v1/volumes?key=${process.env.GOOGLE_BOOKS_API}`

exports.searchForBooks = (req, res) => {
  fetch(`${BASE_API_URL}&q=${req.params.book}`)
    .then(response => response.json())
    .then(bookData => {
      const books = bookData.items.map(book => {
        const { id, volumeInfo: { title, subtitle, authors, imageLinks }  } = book
        return { id, title, subtitle, authors, imageLinks }
      })
      res.send({ success: true, books })
    })
}

exports.addBookToMyLibrary = (req, res) => {
  const bookToBeAdded = { library: { $each: [req.body.book], $position: 0 } }
  User.findByIdAndUpdate(req.user._id, { $push: bookToBeAdded }, { new: true }, (err, user) => {
    if (err) return res.status(500).send({ success: false, msg: err })
    if (!user) return res.status(422).send({ success: false, msg: 'User ID does not exist' })
    res.send({ success: true, user })
  })
}
