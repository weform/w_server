import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-toolbox/lib/button'

class SendCodeBtn extends Component {
  static defaultProps ={
    label: '发送验证码',
    codeCycle: 30,
    onSendSuccess: () => {},
    onSendFail: () => {}
  }

  state = {
    label: this.props.label,
    isWaiting: false
  }

  componentWillUnmount () {
    if (this.countdown) clearInterval(this.countdown)
  }

  sendVerificationCode = () => {
    $.ajax({
      url: this.props.axUrl,
      method: 'POST',
      data: this.props.axData
    })
      .done(() => {
        let time = this.props.codeCycle
        this.setState({ label: `重新发送(${time})`, isWaiting: true })
        this.props.onSendSuccess()
        this.countdown = setInterval(() => {
          time -= 1
          if (time <= 0) {
            this.setState({ label: '重新发送', isWaiting: false })
            clearInterval(this.countdown)
            return
          }
          this.setState({ label: `重新发送(${time})` })
        }, 1000)
      })
      .fail(xhr => {
        this.props.onSendFail(xhr)
      })
  }

  render () {
    return (
      <Button
        className={this.props.className}
        label={this.state.label}
        flat
        primary
        disabled={this.state.isWaiting}
        onClick={this.sendVerificationCode}
      />
    )
  }
}

SendCodeBtn.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  axUrl: PropTypes.string.isRequired,
  axData: PropTypes.object.isRequired,
  codeCycle: PropTypes.number,
  onSendSuccess: PropTypes.func,
  onSendFail: PropTypes.func
}

export default SendCodeBtn
