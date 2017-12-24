import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-flexbox-grid'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import Dropdown from 'react-toolbox/lib/dropdown'

import SendCodeBtn from './SendCodeBtn'
import { successHandle } from '../util'

class SudoIdentify extends Component {
  state = {
    code: '',
    verifyWay: ''
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ verifyWay: nextProps.authWay[0].type })
  }

  changeHandle = (name, value) => {
    this.setState({ [name]: value })
  }

  verify = () => {
    $.ajax({
      url: '/settings/sudo',
      method: 'POST',
      data: {
        code: this.state.code
      }
    })
      .done(() => {
        successHandle('验证成功')
        this.props.onAuthSuccess()
      })
  }

  customItem = item => {
    let icon = 'icon-mail'
    let artist = '邮箱验证'
    let album = `已验证邮箱: ${item.key}`

    if (item.value === 'mobile') {
      icon = 'icon-shouji1'
      artist = '手机验证'
      album = `已验证手机号: ${item.key}`
    }

    return (
      <div className="identify-item">
        <i className={`iconfont ${icon}`} />
        <div className="identify-item-content">
          <strong>{artist}</strong>
          <small>{album}</small>
        </div>
      </div>
    )
  }

  render () {
    const { authWay } = this.props
    const dropSource = authWay.reduce((result, current) => {
      result.push({ value: current.type, key: current.value })
      return result
    }, [])

    const getLoginName = () => {
      const way = dropSource.find(item => item.value === this.state.verifyWay)
      if (way) return way.key
    }

    return (
      <div className="sudo-identify">
        <div>
          <div className="sudo-identify-warn">为了您的账户安全，请先进行身份验证</div>
          <Dropdown
            auto={false}
            source={dropSource}
            onChange={value => this.changeHandle('verifyWay', value)}
            label="选择验证方式"
            template={this.customItem}
            value={this.state.verifyWay}
          />
          <Row>
            <Col md={12} xs={12}>
              <div className="send-code-input-wrapper">
                <Input
                  className="send-code-input"
                  type="text"
                  label={this.state.verifyWay === 'mobile' ? '短信校验码' : '邮箱校验码'}
                  value={this.state.code}
                  onChange={value => this.changeHandle('code', value)}
                />
                <SendCodeBtn
                  className="send-code-btn"
                  key="send-mobile"
                  axUrl="/send_verification_code"
                  axData={{ login_name: getLoginName() }}
                  onSendSuccess={() => successHandle('校验码已发出，请注意查收短信！')}
                  label="获取校验码"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12}>
              <Button raised primary onClick={this.verify}>验证</Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

SudoIdentify.defaultProps = {
  onAuthSuccess: () => {},
  authWay: []
}

SudoIdentify.propTypes = {
  onAuthSuccess: PropTypes.func,
  authWay: PropTypes.array
}

export default SudoIdentify
