import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { validation } from 'value-validate'
import Input from 'react-toolbox/lib/input'

import './theme.scss'

class PasswordInput extends Component {
  state = {
    isShow: false,
    status: 'default',
    msg: ''
  }

  switchVisible = () => {
    this.setState({ isShow: !this.state.isShow })
  }

  changeHandle = value => {
    const { rules, onChange } = this.props
    onChange(value)

    if (typeof rules === 'undefined') return
    validation(value, rules, result => {
      const { isPass, msg } = result
      this.setState({ msg, status: isPass ? 'pass' : 'error' })
    })
  }

  render () {
    const { value, disabled, name, label, className, hint } = this.props
    const { status, msg } = this.state

    const messageElement = <div className="u-message">{msg}</div>

    return (
      <div className={`password-input is-${status} ${className || ''}`}>
        <div className="password-input__wrapper">
          <Input
            type={!this.state.isShow ? 'password' : 'text'}
            label={label}
            name={name}
            value={value}
            hint={hint}
            disabled={disabled}
            onChange={this.changeHandle}
            error={status === 'error'}
          />
          <div
            href="javascript:;"
            className={`eye-button password-input__eye-button ${this.state.isShow ? 'is-active' : ''}`}
            onClick={this.switchVisible}
          >
            <i className="iconfont icon-eye" />
          </div>
        </div>
        { status === 'error' ? messageElement : '' }
      </div>
    )
  }
}

PasswordInput.defaultProps = {
  label: '输入密码',
  value: '',
  onChange: () => {}
}

PasswordInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default PasswordInput
