import axios from 'axios'
import _ from 'lodash'
import { browserHistory } from 'react-router'

const BASE_URL = 'http://localhost:3001'

export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'
const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES
  }
}

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'
const signUpUser = ({ email, password }) => {
  return (dispatch) => {
    if (!email || !password) {
      return dispatch({
        type: SIGN_UP_FAILURE,
        payload: 'You must complete all fields'
      })
    }
    axios.post(`${BASE_URL}/signup`, { email, password })
      .then(({ data }) => {
        const { token, user } = data
        const sanitizedUser = _.pick(user, ['name', 'state', 'city', 'email', '_id'])
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: { token, user: sanitizedUser }
        })
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(sanitizedUser))
        browserHistory.push('/mybooks')
      })
      .catch(err => {
        dispatch({
          type: SIGN_UP_FAILURE,
          payload: 'This email already exists'
        })
      })
  }
}

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'
const signInUser = ({ email, password }) => {
  return (dispatch) => {
    if (!email || !password) {
      return dispatch({
        type: SIGN_IN_FAILURE,
        payload: 'You must complete all fields'
      })
    }

    axios.post(`${BASE_URL}/signin`, { email, password })
      .then(({ data }) => {
        const { token, user } = data
        const sanitizedUser = _.pick(user, ['name', 'state', 'city', 'email', '_id'])
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: { token, user: sanitizedUser }
        })
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(sanitizedUser))
        browserHistory.push('/mybooks')
      })
      .catch(err => {
        dispatch({
          type: SIGN_IN_FAILURE,
          payload: 'Password and/or email are invalid'
        })
      })
  }
}

export const FETCH_USER_BOOKS = 'FETCH_USER_BOOKS'
const fetchUserBooks = (userId) => {
  return (dispatch, getState) => {
    const config = { headers: { 'Authorization': getState().auth.token } }
    axios.get(`${BASE_URL}/books/user/${userId}`, config)
      .then(({ data }) => {
        const { library } = data.user
        dispatch({
          type:  FETCH_USER_BOOKS,
          payload: library
        })
      })
  }
}

const deleteBook = (id) => {
  return (dispatch, getState) => {
    const config = {
      headers: { 'Authorization': getState().auth.token },
      params: { id }
    }
    axios.delete(`${BASE_URL}/books/delete`, config)
      .then(({ data }) => {
        const { library } = data
        console.log('the library', library)
        dispatch({
          type: FETCH_USER_BOOKS,
          payload: library
        })
      })
  }
}

const searchForBooks = (searchTerm) => {
  return (dispatch, getState) => {
    const config = { headers: { 'Authorization': getState().auth.token } }
    axios.get(`${BASE_URL}/books/search/${searchTerm}`, config)
      .then(({ data }) => {
        console.log(data)
        dispatch({ type: 'test' })
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export const actionCreators = {
  signUpUser,
  signInUser,
  clearMessages,
  fetchUserBooks,
  deleteBook,
  searchForBooks
}
