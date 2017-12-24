import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from 'react-toolbox/lib/input'

class PasswordInput extends Component {
  state = {
    isShow: false
  }

  switchVisible = () => {
    this.setState({ isShow: !this.state.isShow })
  }

  render () {
    return (
      <div className="password-input">
        <Input
          type={!this.state.isShow ? 'password' : 'text'}
          label={this.props.label}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <a
          href="javascript:;"
          className={`eye-button password-input__eye-button ${this.state.isShow ? 'active' : ''}`}
          onClick={this.switchVisible}
        >
          <i className="iconfont icon-eye" />
        </a>
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
