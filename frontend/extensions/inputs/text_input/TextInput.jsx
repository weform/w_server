import React from 'react'
import PropTypes from 'prop-types'
import { validation } from 'value-validate'

class TextInput extends React.Component {
  static defaultProps = {
    value: '',
    disabled: false,
    className: '',
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
    const { value, disabled, name } = this.props
    const { status, msg } = this.state

    const inputElementProps = {
      name,
      onChange: this.changeHandle,
      disabled,
      value
    }

    const messageElement = <div className="message">{msg}</div>

    return (
      <div className="">
        <div className="">
          {React.createElement('input', inputElementProps)}
        </div>
        { status !== 'default' ? messageElement : '' }
      </div>
    )
  }
}

TextInput.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
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
