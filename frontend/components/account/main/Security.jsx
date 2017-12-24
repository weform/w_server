import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import Dialog from 'react-toolbox/lib/dialog'

import { Row, Col } from 'react-flexbox-grid'
import { Button } from 'react-toolbox/lib/button'

import ColumnTitle from '../shared/ColumnTitle'
import EditEmailPanel from '../security/EditEmailPanel'
import EditMobilePanel from '../security/EditMobilePanel'
import EditPasswordPanel from '../security/EditPasswordPanel'
import SetPasswordPanel from '../security/SetPasswordPanel'
import SudoIdentify from '../shared/SudoIdentify'

import { successHandle } from '../util'

@inject('security', 'app') @observer
class Security extends Component {
  state = {
    onAuthSuccess: () => {},
    authWay: []
  }

  componentWillMount () {
    this.props.security.fetch()
  }

  setPassword = () => {
    this.props.app.dialogStatus = 'set-password'
  }

  bindMobile = () => {
    this.verifySudo('mobile', 'bind-mobile')
  }

  editMobile = () => {
    this.verifySudo('mobile', 'edit-mobile')
  }

  bindEmail = () => {
    this.verifySudo('email', 'bind-email')
  }

  editEmail = () => {
    this.verifySudo('email', 'edit-email')
  }

  verifySudo = (type, status) => {
    $.ajax({
      url: `/settings/${type}/edit`,
      dataType: 'json'
    })
      .done(() => {
        this.props.app.dialogStatus = status
      })
      .fail(xhr => {
        if (xhr.status === 403) {
          this.gainIdentify()
          this.setState({
            authWay: xhr.responseJSON,
            onAuthSuccess: () => { this.props.app.dialogStatus = status }
          })
        }
      })
  }

  editPassword = () => {
    this.props.app.dialogStatus = 'edit-password'
  }

  gainIdentify = () => {
    this.props.app.dialogStatus = 'sudo-identify'
  }

  activateEmail = () => {
    $.ajax({
      url: '/settings/verify_email',
      method: 'POST'
    })
      .done(() => {
        successHandle('已发送验证地址到您的邮箱，请查收！')
      })
  }


  render () {
    const { email, mobile, password } = this.props.security.data
    return (
      <section className="security">
        <Dialog
          title="绑定手机号"
          active={this.props.app.dialogStatus === 'bind-mobile'}
          onOverlayClick={() => this.props.app.closeDialog()}
        >
          <EditMobilePanel />
        </Dialog>
        <Dialog
          title="修改手机号"
          active={this.props.app.dialogStatus === 'edit-mobile'}
          onOverlayClick={() => this.props.app.closeDialog()}
        >
          <EditMobilePanel />
        </Dialog>
        <Dialog
          title="绑定邮箱"
          active={this.props.app.dialogStatus === 'bind-email'}
          onOverlayClick={() => this.props.app.closeDialog()}
        >
          <EditEmailPanel />
        </Dialog>
        <Dialog
          title="修改邮箱"
          active={this.props.app.dialogStatus === 'edit-email'}
          onOverlayClick={() => this.props.app.closeDialog()}
        >
          <EditEmailPanel />
        </Dialog>
        <Dialog
          title="身份验证"
          active={this.props.app.dialogStatus === 'sudo-identify'}
          onOverlayClick={() => this.props.app.closeDialog()}
        >
          <SudoIdentify authWay={this.state.authWay} onAuthSuccess={this.state.onAuthSuccess} />
        </Dialog>
        <Dialog
          title="修改密码"
          type="small"
          active={this.props.app.dialogStatus === 'edit-password'}
          onOverlayClick={() => this.props.app.closeDialog()}
        >
          <EditPasswordPanel />
        </Dialog>
        <Dialog
          title="设置密码"
          type="small"
          active={this.props.app.dialogStatus === 'set-password'}
          onOverlayClick={() => this.props.app.closeDialog()}
        >
          <SetPasswordPanel />
        </Dialog>
        <Row>
          <Col md={12} xs={12}>
            <ColumnTitle title="账户安全" en="Security" />
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12}>
            <div className="security-item">
              <div className="security-item__left">
                <div className="security-item__label">
                  <span className="security-item__text">注册邮箱：</span>
                  <span className="security-item__info">{email.email}</span>
                  <span className="security-item__status">
                    { email.email ? email.verified ? '(已激活)' : '(未激活)' : '未绑定' }
                  </span>
                </div>
                <div className="security-item__tip">
                  邮箱可以用于登录账号，重置密码或者其他安全登录
                </div>
              </div>
              <div className="security-item__right">
                {
                  !email.verified && !!email.email ? <Button raised primary onClick={this.activateEmail}>激活</Button> : ''
                }
                {
                  !email.email
                    ? <Button raised primary onClick={this.bindEmail}>绑定</Button>
                    : <Button raised onClick={this.editEmail}>修改</Button>
                }
              </div>
            </div>
            <div className="security-item">
              <div className="security-item__left">
                <div className="security-item__label">
                  <span className="security-item__text">注册手机：</span>
                  <span className="security-item__info">{mobile || '未绑定'}</span>
                </div>
                <div className="security-item__tip">
                  手机号可以用于登录账号，重置密码或者其他安全登录
                </div>
              </div>
              <div className="security-item__right">
                {
                  !mobile
                    ? <Button raised primary onClick={this.bindMobile}>绑定</Button>
                    : <Button raised onClick={this.editMobile}>修改</Button>
                }
              </div>
            </div>
            <div className="security-item">
              <div className="security-item__left">
                <div className="security-item__label">
                  <span className="security-item__text">账户密码{password ? '' : '(未设置)'}</span>
                </div>
              </div>
              <div className="security-item__right">
                {
                  password
                    ? <Button raised onClick={this.editPassword}>修改</Button>
                    : <Button raised primary onClick={this.setPassword}>设置密码</Button>
                }
              </div>
            </div>
          </Col>
        </Row>
      </section>
    )
  }
}

Security.propTypes = {
  security: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired
}

export default Security
