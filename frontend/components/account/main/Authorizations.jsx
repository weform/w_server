import React from 'react'
import PropTypes from 'prop-types'

import { observer, inject } from 'mobx-react'
import { Row, Col } from 'react-flexbox-grid'
import { Button } from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'

import ColumnTitle from '../shared/ColumnTitle'
import { successHandle } from '../util'

import WechatLogin from '../social/WechatLogin'

@inject('authorizations', 'app') @observer
class Authorizations extends React.Component {
  componentWillMount () {
    this.props.authorizations.fetch()
  }

  cancelBind = type => {
    this.props.app.openConfim({
      text: '确认取消绑定?',
      ensureFunc: () => {
        $.ajax({
          url: `/settings/authorizations/${type}`,
          method: 'DELETE'
        })
          .done(() => {
            this.props.authorizations.fetch()
            successHandle('取消绑定成功')
          })
      }
    })
  }

  wxLogin = () => {
    this.props.app.dialogStatus = 'wx-login'
  }

  render () {
    const { weibo, wechat, github } = this.props.authorizations.data

    return (
      <section className="authorizations">
        <Dialog
          className="wx-login-modal"
          active={this.props.app.dialogStatus === 'wx-login'}
          onOverlayClick={() => this.props.app.closeDialog()}
        >
          <WechatLogin />
        </Dialog>
        <Row>
          <Col md={12} xs={12}>
            <ColumnTitle title="第三方授权" en="Social" tip="可直接使用绑定的第三方帐号登录" />
          </Col>
        </Row>
        <Row className={`authorizations__item authorizations__wechat ${wechat ? 'active' : ''} `}>
          <div className="authorizations__left">
            <span className="authorizations__type">
              <i className="iconfont icon-wechat" />
              微信
            </span>
            <span className="authorizations__status">{wechat ? '已绑定' : '未绑定'}</span>
          </div>
          <div className="authorizations__right">
            {
              !wechat
                ? <Button raised primary onClick={this.wxLogin} label="立即绑定" />
                : <Button raised label="取消绑定" onClick={() => this.cancelBind('wechat')} />
            }
          </div>
        </Row>
        <Row className={`authorizations__item authorizations__weibo ${weibo ? 'active' : ''} `}>
          <div className="authorizations__left">
            <span className="authorizations__type">
              <i className="iconfont icon-weibo" />
              微博
            </span>
            <span className="authorizations__status">{weibo ? '已绑定' : '未绑定'}</span>
          </div>
          <div className="authorizations__right">
            {
              !weibo
                ? <Button raised primary href="/auth/weibo" label="立即绑定" />
                : <Button raised label="取消绑定" onClick={() => this.cancelBind('weibo')} />
            }
          </div>
        </Row>
        <Row className={`authorizations__item authorizations__github ${github ? 'active' : ''} `}>
          <div className="authorizations__left">
            <span className="authorizations__type">
              <i className="iconfont icon-github" />
              GitHub
            </span>
            <span className="authorizations__status">{github ? '已绑定' : '未绑定'}</span>
          </div>
          <div className="authorizations__right">
            {
              !github
                ? <Button raised primary href="/auth/github" label="立即绑定" />
                : <Button raised label="取消绑定" onClick={() => this.cancelBind('github')} />
            }
          </div>
        </Row>
      </section>
    )
  }
}

Authorizations.propTypes = {
  app: PropTypes.object.isRequired,
  authorizations: PropTypes.object.isRequired
}

export default Authorizations
