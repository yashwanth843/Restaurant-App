import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isShowing: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({isShowing: true, errorMsg: error})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {isShowing, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginFormContainer">
        <form className="form-Container" onSubmit={this.submitForm}>
          <div className="userNameContainer">
            <label className="userHeader" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Enter UserName"
              className="userInput"
              id="username"
              onChange={this.onChangeUserName}
              value={username}
            />
          </div>
          <div className="userNameContainer">
            <label className="userHeader" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="userInput"
              id="password"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>
          <div className="loginButtonContainer">
            <button type="submit" className="loginButton">
              Login
            </button>
            {isShowing && <p className="error_msg">{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
