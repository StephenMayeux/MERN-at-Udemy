import React from 'react'
import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip
} from 'recharts'
import _ from 'lodash'

const colors = [
  '#82ca9d',
  '#C0392B',
  '#2980B9',
  '#27AE60',
  '#E67E22'
]

const RenderLineChart = (props) => {
  const chartLines = props.tickers.map(ticker => {
    return <Line key={ticker} type="monotone" dataKey={ticker} stroke={_.sample(colors)} />
  })

  return (
    <LineChart width={730} height={250} data={props.chartData}>
      <XAxis dataKey="date" />
      <YAxis type="number" domain={['dataMin', 'dataMax']} />
      <Legend />
      <Tooltip />
      {chartLines}
    </LineChart>
  )
}

export default RenderLineChart
