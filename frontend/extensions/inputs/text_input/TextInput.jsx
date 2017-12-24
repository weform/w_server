import React from 'react'
import PropTypes from 'prop-types'
import { validation } from 'value-validate'
import Input from 'react-toolbox/lib/input'

import './theme.scss'

class TextInput extends React.Component {
  state = {
    status: 'default',
    msg: ''
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
    const { value, disabled, name, label, className, multiline, hint } = this.props
    const { status, msg } = this.state

    const messageElement = <div className="u-message">{msg}</div>

    return (
      <div className={`text-input is-${status} ${className || ''}`}>
        <div className="text-input__wrapper">
          <Input
            type="text"
            name={name}
            label={label}
            hint={hint}
            onChange={this.changeHandle}
            disabled={disabled}
            multiline={multiline}
            value={value}
            error={status === 'error'}
          />
        </div>
        { status === 'error' ? messageElement : '' }
      </div>
    )
  }
}

TextInput.defaultProps = {
  value: '',
  disabled: false,
  className: null,
  onChange: () => {}
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
