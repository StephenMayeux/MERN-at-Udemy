export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM'
const updateSearchTerm = (term) => {
  return {
    type: UPDATE_SEARCH_TERM,
    payload: term
  }
}

export const actionCreators = {
  updateSearchTerm
}
