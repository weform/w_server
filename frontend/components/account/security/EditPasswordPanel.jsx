import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Button } from 'react-toolbox/lib/button'
import PasswordInput from '../shared/PasswordInput'

import { successHandle } from '../util'

@inject('app') @observer
class EditPasswordPanel extends Component {
  state = {
    originPassword: '',
    password: ''
  }
  changeHandle = (name, value) => {
    this.setState({ [name]: value })
  }

  savePassword = () => {
    $.ajax({
      url: '/settings/password',
      method: 'PATCH',
      data: {
        'user[origin_password]': this.state.originPassword,
        'user[password]': this.state.password
      }
    })
      .done(() => {
        successHandle('密码修改成功')
        this.props.app.closeDialog()
      })
  }

  render () {
    return (
      <div className="edit-password-panel">
        <PasswordInput label="原密码" value={this.state.originPassword} onChange={value => this.changeHandle('originPassword', value)} />
        <PasswordInput label="新密码" value={this.state.password} onChange={value => this.changeHandle('password', value)} />
        <Button raised primary onClick={this.savePassword}>保存</Button>
      </div>
    )
  }
}


EditPasswordPanel.propTypes = {
  app: PropTypes.object.isRequired
}

export default EditPasswordPanel
