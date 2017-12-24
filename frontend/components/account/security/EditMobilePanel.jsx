import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Row, Col } from 'react-flexbox-grid'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'

import SendCodeBtn from '../shared/SendCodeBtn'
import { successHandle } from '../util'

@inject('security', 'app') @observer
class EditMobilePanel extends Component {
  state = {
    mobile: '',
    code: ''
  }

  changeHandle = (name, value) => {
    this.setState({ [name]: value })
  }

  sendCode = () => {
    $.ajax({
      url: '/settings/mobile',
      method: 'PATCH',
      data: {
        'user[mobile]': this.state.mobile,
        'user[phone_verify_code]': this.state.code
      }
    })
      .done(() => {
        successHandle('修改成功')
        this.props.app.closeDialog()
        this.props.security.fetch()
      })
  }

  render () {
    return (
      <div className="edit-mobile-panel">
        <Input type="text" label="手机号" value={this.state.mobile} onChange={value => this.changeHandle('mobile', value)} />
        <Row>
          <Col md={6} xs={12}>
            <div className="send-code-input-wrapper">
              <Input className="send-code-input" type="text" label="短信校验码" value={this.state.code} onChange={value => this.changeHandle('code', value)} />
              <SendCodeBtn
                className="send-code-btn"
                axUrl="/phone_verify_code"
                axData={{ mobile: this.state.mobile }}
                onSendSuccess={() => successHandle('校验码已发出，请注意查收短信！')}
                label="获取短信校验码"
              />
            </div>
          </Col>
        </Row>
        <Button raised primary onClick={this.sendCode}>绑定</Button>
      </div>
    )
  }
}


EditMobilePanel.propTypes = {
  app: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
}

export default EditMobilePanel
