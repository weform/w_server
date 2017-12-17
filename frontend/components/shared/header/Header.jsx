import React from 'react'
import Login from '../account/Login'
import Signup from '../account/Signup'

import Alert from 'react-s-alert'
import _ from 'lodash'

class Header extends React.PureComponent {
  toLogout = () => {
    $.ajax({
      method: 'DELETE',
      url: '/logout'
    })
      .done(data => {
        Alert.success(data.msg)
        this.props.actions.updateCurrentUser({...data.user})
      })
      .fail(xhr => {
        Alert.error(xhr.responseJSON.msg)
      })
  }

  render () {
    const { actions, currentUser } = this.props

    let loginContent = null

    if (!_.isEmpty(currentUser)) {
      loginContent = (
        <div>
          <div>{currentUser.email}</div>
          <a
            className="header__login"
            href="javascript:;"
            onClick={this.toLogout}
          >
            退出
          </a>
          <a className="header__login" href="/account">个人中心</a>
        </div>
      )
    } else {
      loginContent = (
        <div>
          <a
            className="header__login"
            href="javascript:;"
            onClick={() => actions.openModal(<Login actions={actions} />)}
          >
            登陆
          </a>
          <span>/</span>
          <a
            className="header__login"
            href="javascript:;"
            onClick={() => actions.openModal(<Signup actions={actions} />)}
          >
            注册
          </a>
        </div>
      )
    }

    return (
      <header className="header">
        <div className="header__logo">
          VForm 微表单
        </div>
        <div className="header__right">
          <a className="header__button" href="javascript:;">
            下载APP
          </a>
          {loginContent}
        </div>
      </header>
    )
  }
}

export default Header
