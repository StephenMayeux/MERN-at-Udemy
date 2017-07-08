const Books = require('../controllers/books')
const express = require('express')
const router = express.Router()

const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

router.get('/search/:book', requireAuth, Books.searchForBooks)
router.post('/add', requireAuth, Books.addBookToMyLibrary)
router.get('/user/:id', requireAuth, Books.getUsersBooks)
router.delete('/delete', requireAuth, Books.removeBookFromMyLibrary)
router.post('/request', requireAuth, Books.requestBook)
router.get('/request', requireAuth, Books.getMyRequests)

/**
  1) Search for a list of books
  2) Add a book from the search results to My Library
  3) Get a list of the books in My Library or another user's library
  4) Delete a book from My Library
  5) Request a book from another user
  6) Get a list of: 1) pending requests I made, open requests others have sent me
  7) Accept a request by another user
  8) Reject a request by another user
**/

module.exports = router
