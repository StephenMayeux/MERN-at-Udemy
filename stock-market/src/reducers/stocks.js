import {
  UPDATE_STOCKS
} from '../actions'

// uncomment with client-only dev server
// import {
//   chartData,
//   tickers
// } from '../lib/seed'

const INITIAL_STATE = {
  chartData: [],
  tickers: []
}

export default (state = INITIAL_STATE, action) => {
  const { type, chartData, tickers } = action
  switch (type) {
    case UPDATE_STOCKS:
      return { chartData, tickers }
    default:
      return state
  }
}
