import React from 'react'
import TextInput from 'extensions/inputs/text_input/TextInput'

import Alert from 'react-s-alert'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    password_confirmation: ''
  }

  changeHandle = (name, value) => {
    this.setState({ [name]: value })
  }

  toSignup = () => {
    $.ajax({
      method: 'POST',
      url: '/signup',
      data: {
        'users[email]': this.state.email,
        'users[password]': this.state.password,
        'users[password_confirmation]': this.state.password_confirmation
      }
    })
      .done(data => {
        this.props.actions.closeModal()
        Alert.success(data.msg)
      })
      .fail(xhr => {
        Alert.error(xhr.responseJSON.msg)
      })
  }

  render () {
    return (
      <div className="login">
        <div className="login__left">
          <TextInput
            value={this.state.email}
            className="login__input"
            placeholder="电子邮箱/手机号"
            onChange={value => this.changeHandle('email', value)}
          />
          <TextInput
            placeholder="密码"
            className="login__input"
            value={this.state.password}
            onChange={value => this.changeHandle('password', value)}
          />
          <TextInput
            placeholder="密码"
            className="login__input"
            value={this.state.password_confirmation}
            onChange={value => this.changeHandle('password_confirmation', value)}
          />
          <a
            className="login__button"
            href="javascript:;"
            onClick={this.toSignup}
          >立即注册</a>
        </div>
      </div>
    )
  }
}

export default Login
