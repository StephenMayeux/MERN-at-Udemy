const Symbol = require('./models/Symbol')

module.exports = (socket) => {
  // put socket event emitters/listeners here 
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
