import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'

import { successHandle } from '../util'

@inject('security', 'app') @observer
class EditEmailPanel extends Component {
  state = {
    email: ''
  }
  changeHandle = (name, value) => {
    this.setState({ [name]: value })
  }

  saveEmail = () => {
    $.ajax({
      url: '/settings/email',
      method: 'PATCH',
      data: {
        'user[email]': this.state.email
      }
    })
      .done(() => {
        this.props.security.fetch()
        this.props.app.closeDialog()
        this.changeHandle('email', '')
        successHandle('邮箱修改成功！')
      })
  }

  render () {
    return (
      <div className="edit-email-panel">
        <Input type="text" label="输入邮箱地址" value={this.state.email} onChange={value => this.changeHandle('email', value)} />
        <Button raised primary onClick={this.saveEmail}>保存</Button>
      </div>
    )
  }
}


EditEmailPanel.propTypes = {
  app: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
}

export default EditEmailPanel
