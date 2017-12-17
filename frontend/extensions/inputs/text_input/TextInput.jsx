import React from 'react'
import PropTypes from 'prop-types'
import { validation } from 'value-validate'

import './theme.scss'

class TextInput extends React.Component {
  static defaultProps = {
    value: '',
    disabled: false,
    className: null,
    onChange: () => {}
  }

  state = {
    status: 'default',
    msg: ''
  }

  changeHandle = e => {
    const { rules, onChange } = this.props
    const newValue = e.target.value
    onChange(newValue)

    if (typeof rules === 'undefined') return
    validation(newValue, rules, result => {
      const { isPass, msg } = result
      this.setState({ msg, status: isPass ? 'pass' : 'error' })
    })
  }

  render () {
    const { value, disabled, name, placeholder, className } = this.props
    const { status, msg } = this.state

    const messageElement = <div className="u-message">{msg}</div>

    return (
      <div className={`text-input is-${status} ${className || ''}`}>
        <div className="text-input__wrapper">
          <input
            name={name}
            placeholder={placeholder}
            onChange={this.changeHandle}
            disabled={disabled}
            value={value}
          />
        </div>
        { status !== 'default' ? messageElement : '' }
      </div>
    )
  }
}

TextInput.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]),
  rules: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ])),
  multiline: PropTypes.bool
}

export default TextInput
