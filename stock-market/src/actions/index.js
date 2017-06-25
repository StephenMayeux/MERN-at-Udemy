import _ from 'lodash'

export const UPDATE_STOCKS = 'UPDATE_STOCKS'
const updateStocks = ({ chartData, tickers }) => {

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

export const actionCreators = {
  updateStocks
}
