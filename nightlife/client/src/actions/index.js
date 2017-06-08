import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM'
const updateSearchTerm = (term) => {
  return {
    type: UPDATE_SEARCH_TERM,
    payload: term
  }
}

export const BAR_SEARCH_RESULTS = 'BAR_SEARCH_RESULTS'
const barSeachResults = (location) => {
  return (dispatch) => {
    axios.get(`${BASE_URL}/bars/search/${location}`)
      .then(({ data }) => {
        const { bars } = data
        return dispatch({
          type: BAR_SEARCH_RESULTS,
          payload: bars
        })
      })
      .catch(error => console.error('Error fetch bar results', error))
  }
}

export const actionCreators = {
  updateSearchTerm,
  barSeachResults
}