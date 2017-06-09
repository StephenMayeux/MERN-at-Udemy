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

export const HANDLE_SIGN_IN = 'HANDLE_SIGN_IN'
const handleSignIn = ({ emailForm, passwordForm }) => {
  return (dispatch) => {
    axios.post(`${BASE_URL}/signin`, { email: emailForm, password: passwordForm })
      .then(({ data }) => {
        const { token, user } = data
        localStorage.setItem('token', token)
        return dispatch({
          type: HANDLE_SIGN_IN,
          payload: { token, user }
        })
      })
  }
}

export const UPDATE_EMAIL_FORM = 'UPDATE_EMAIL_FORM'
const updateEmailForm = (email) => {
  return {
    type: UPDATE_EMAIL_FORM,
    payload: email
  }
}

export const UPDATE_PASSWORD_FORM = 'UPDATE_PASSWORD_FORM'
const updatePasswordForm = (password) => {
  return {
    type: UPDATE_PASSWORD_FORM,
    payload: password
  }
}

export const actionCreators = {
  updateSearchTerm,
  barSeachResults,
  handleSignIn,
  updateEmailForm,
  updatePasswordForm
}
