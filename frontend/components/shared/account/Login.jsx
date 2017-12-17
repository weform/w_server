import React from 'react'
import TextInput from 'extensions/inputs/text_input/TextInput'

class Login extends React.Component {
  state = {
    account: '',
    password: ''
  }

  changeHandle = (name, value) => {
    this.setState({ [name]: value })
  }

  toLogin = () => {
    $.ajax({
      method: 'POST',
      url: '/login',
      data: {
        'sessions[email]': this.state.account,
        'sessions[password]': this.state.password
      }
    })
      .done(data => {
        this.props.actions.closeModal()
      })
      .fail(error => {
        console.log('error', error)
      })
      .always(xhr => {
        this.props.actions.updateCurrentUser({...xhr.user})
      })
  }

  render () {
    return (
      <div className="login">
        <div className="login__left">
          <TextInput
            value={this.state.account}
            className="login__input"
            placeholder="电子邮箱/手机号"
            onChange={value => this.changeHandle('account', value)}
          />
          <TextInput
            placeholder="密码"
            className="login__input"
            value={this.state.password}
            onChange={value => this.changeHandle('password', value)}
          />
          <a
            className="login__button"
            href="javascript:;"
            onClick={this.toLogin}
          >登陆</a>
        </div>
      </div>
    )
  }
}

export default Login
