import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Button } from 'react-toolbox/lib/button'
import PasswordInput from '../shared/PasswordInput'

import { successHandle } from '../util'

@inject('app', 'security') @observer
class SetPasswordPanel extends Component {
  state = {
    password: ''
  }
  changeHandle = (name, value) => {
    this.setState({ [name]: value })
  }

  savePassword = () => {
    $.ajax({
      url: '/settings/password',
      method: 'POST',
      data: {
        'user[password]': this.state.password
      }
    })
      .done(() => {
        successHandle('密码设置成功')
        this.props.security.fetch()
        this.props.app.closeDialog()
      })
  }

  render () {
    return (
      <div className="set-password-panel">
        <PasswordInput label="输入密码" value={this.state.password} onChange={value => this.changeHandle('password', value)} />
        <Button raised primary onClick={this.savePassword}>保存</Button>
      </div>
    )
  }
}


SetPasswordPanel.propTypes = {
  app: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
}

export default SetPasswordPanel
