const fetch = require('isomorphic-fetch')
const async = require('async')

const User = require('../models/user')
const Book = require('../models/book')

const BASE_API_URL = `https://www.googleapis.com/books/v1/volumes?key=${process.env.GOOGLE_BOOKS_API}`

exports.searchForBooks = (req, res) => {
  fetch(`${BASE_API_URL}&q=${req.params.book}`)
    .then(response => response.json())
    .then(bookData => {
      const books = bookData.items.map(book => {
        const { id, volumeInfo: { title, subtitle, authors, imageLinks: { thumbnail } }  } = book
        return { _id: id, title, subtitle, authors, thumbnail }
      })
      res.send({ success: true, books })
    })
    .catch(err => res.status(500).send({ success: false, err }))
}

exports.addBookToMyLibrary = (req, res) => {
  const { _id, title, subtitle, authors, thumbnail } = req.body
  async.waterfall([
    (callback) => {
      Book.findById(_id).lean().exec((err, book) => {
        if (err) return callback(err)
        callback(null, book)
      })
    },
    (book, callback) => {
      if (!book) {
        const newBook = new Book({ _id, title, subtitle, authors, thumbnail })
        newBook.save(err => {
          if (err) return callback(err)
          callback(null, newBook.toObject())
        })
      }
      else {
        callback(null, book)
      }
    },
    (book, callback) => {
      const newBookObj = { book: book._id, requested_by: [] }
      User.findByIdAndUpdate(req.user._id, { $push: { library: newBookObj } }, { new: true }, (err, user) => {
        if (err) return callback(err)
        callback(null, user)
      })
    }
  ], (err, user) => {
    if (err) return res.status(500).send({ success: false, err })
    res.send({ success: true, user })
  })
}

exports.getUsersBooks = (req, res) => {
  User.findById(req.params.id).populate('library.book').populate('library.requested_by').exec((err, user) => {
    if (err) return res.status(500).send({ success: false, err })
    res.send({ success: true, user })
  })
}

exports.removeBookFromMyLibrary = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { $pull: { library: { book: req.body.id } } }, { new: true }, (err, user) => {
    res.send(user)
  })
}

exports.requestBook = (req, res) => {
  const { user_id, book_id } = req.body
  User.findOneAndUpdate({ _id: user_id, 'library._id': book_id }, { $push: { 'library.$.requested_by': req.user._id } }, { new: true }, (err, user) => {
    if (err) return res.status(500).send({ success: false, err })
    res.send({ success: true, user })
  })
}
