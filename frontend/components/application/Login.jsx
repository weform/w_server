import React from 'react'
import TextInput from 'extensions/inputs/text_input/TextInput'
import PasswordInput from 'extensions/inputs/password_input/PasswordInput'

import RippleButton from 'extensions/buttons/ripple_button/RippleButton'

import Alert from 'react-s-alert'

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
        Alert.success(data.msg)
        this.props.actions.updateCurrentUser({...data.user})
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
            value={this.state.account}
            type="text"
            className="login__input"
            label="电子邮箱/手机号"
            onChange={value => this.changeHandle('account', value)}
          />
          <PasswordInput
            label="密码"
            className="login__input"
            value={this.state.password}
            onChange={value => this.changeHandle('password', value)}
          />
          <RippleButton
            className="login__button"
            href="javascript:;"
            onClick={this.toLogin}
          >
            立即登陆
          </RippleButton>
        </div>
      </div>
    )
  }
}

export default Login
