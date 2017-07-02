const Books = require('../controllers/books')
const express = require('express')
const router = express.Router()

router.get('/search/:book', Books.searchForBooks)

/**
  1) Search for a list of books
  2) Add a book from the search results to My Library
  x) Get a list of the books in My Library
  3) Delete a book from My Library
  x) Get a list of the books from another user
  4) Request a book from another user
  x) Get a list of: 1) pending requests I made, open requests others have sent me
  5) Accept a request by another user
  6) Reject a request by another user
  7) Returning a book to its original user
**/

module.exports = router
