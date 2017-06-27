import _ from 'lodash'

export const UPDATE_STOCKS = 'UPDATE_STOCKS'
const updateStocks = ({ data, tickers }) => {

  const chartData = data.map(chunk => {
    return {
      [chunk[0]]: chunk[2],
      date: chunk[1]
    }
  })

  let formattedChartData = []

  for (let i = 0; i < chartData.length; i++) {
    let index = _.findIndex(formattedChartData, (chunk) => {
      return chartData[i].date === chunk.date
    })
    if (index === -1) {
      formattedChartData.push(chartData[i])
    }
    else {
      Object.assign(formattedChartData[index], chartData[i])
    }
  }

  return {
    type: UPDATE_STOCKS,
    chartData: formattedChartData,
    tickers
  }
}

const deleteTicker = ({ ticker }) => {
  return (dispatch, getState) => {
    let { chartData, tickers } = _.cloneDeep(getState().stocks)

    _.pull(tickers, ticker)
    chartData.forEach(chunk => {
      delete chunk[ticker]
    })

    dispatch({
      type: UPDATE_STOCKS,
      chartData,
      tickers
    })
  }
}

export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE'
const displayMessage = (msg) => {
  return {
    type: DISPLAY_MESSAGE,
    msg
  }
}

const addNewStock = ({ data, ticker }) => {
  return (dispatch, getState) => {
    let { chartData, tickers } = _.cloneDeep(getState().stocks)

    tickers.push(ticker)
    const formattedData = data.map(chunk => {
      return {
        [chunk[0]]: chunk[2],
        date: chunk[1]
      }
    })

    for (let i = 0; i < chartData.length; i++) {
      Object.assign(chartData[i], formattedData[i])
    }

    dispatch({
      type: UPDATE_STOCKS,
      chartData,
      tickers
    })
  }
}

export const actionCreators = {
  updateStocks,
  deleteTicker,
  displayMessage,
  addNewStock
}
