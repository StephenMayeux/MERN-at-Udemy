import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

export default class AuthService {
  constructor(clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3001/login',
        responseType: 'token'
      }
    })
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    this.setToken(authResult)
    browserHistory.push('/vote')
  }

  login() {
    this.lock.show()
  }

  loggedIn() {
    return !!this.getToken()
  }

  setToken({ idToken, idTokenPayload}) {
    localStorage.setItem('id_token', idToken)
    localStorage.setItem('username', idTokenPayload.sub)
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  getUsername() {
    return localStorage.getItem('username')
  }

  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('username')
    browserHistory.push('/')
  }
}
