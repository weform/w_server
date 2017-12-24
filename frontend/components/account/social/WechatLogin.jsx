import React, { Component } from 'react'

import { initWxLogin } from 'utils/tool'

class WechatLogin extends Component {
  componentDidMount () {
    initWxLogin()
  }

  render () {
    return (
      <div className="wx-login">
        <div id="wx-login-qrcode" />
      </div>
    )
  }
}

export default WechatLogin
