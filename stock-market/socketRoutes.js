const moment = require('moment')
const fetch = require('isomorphic-fetch')
const Symbol = require('./models/Symbol')

module.exports = (socket) => {

  // Initial Load
  Symbol.find({}).lean().exec((err, symbols) => {
    if (err) {
      socket.emit('initWithError', { msg: 'Error reading from database' })
    } else if (!symbols.length) {
      socket.emit('initWithError', { msg: 'There are no symbols in the database' })
    } else {
      const tickers = symbols.map(({ symbol }) => symbol)
      const lte = moment().format('YYYYMMDD')
      const gte = moment().subtract(1, 'months').format('YYYYMMDD')
      const quandl = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?qopts.columns=ticker,date,close&date.gte=${gte}&date.lte=${lte}&ticker=${tickers.join(',')}&api_key=${process.env.QUANDL_API}`

      fetch(quandl).then(response => response.json()).then(({ datatable }) => {
        const { data } = datatable
        socket.emit('init', { data, tickers })
      })
    }
  })

  // Deleting Stock
  socket.on('deleteTicker', ({ ticker }) => {
    Symbol.deleteOne({ symbol: ticker }, (err) => {
      if (err) {
        socket.emit('deleteWithError', { msg: 'Error deleting stock' })
      } else {
        socket.broadcast.emit('deleteStock', { ticker })
      }
    })
  })

  // Adding stock
  

}

/*
  -- on application load, retrieve persisted symbols from db
    -- if there are no symbols, emit action to handle UI appropriately
    -- if there are symbols, fetch for quandl table data passing all symbols
      -- massage quandl response in a format we like
      -- emit an action to client with stock data

  -- user attempts to add stock symbol from client
    -- if user attempts to add symbol that has already been added, respond with message saying so
  -- client makes request to Quandl, with the datasets API
    -- if user attempts to add symbol that doesn't exist, respond with message saying so
    -- otherwise, massage response from quandl in a format we like
      -- save this response to the client redux store and emit action to server with data
  -- on server action, persist symbol to db
    -- if successful, broadcast.emit symbol and data to other clients and update their redux stores

  -- user deletes a symbol from the client
    -- removes the symbol and its data from redux store
    -- emits action to server, which deletes symbol from db
    -- broadcast.emit removed symbol to all other clients
      -- on this event, clients remove symbol from their redux store
*/
