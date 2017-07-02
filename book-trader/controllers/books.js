const fetch = require('isomorphic-fetch')

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
