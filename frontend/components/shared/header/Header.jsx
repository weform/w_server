import React from 'react'
import Login from '../account/Login'
import _ from 'lodash'

class Header extends React.PureComponent {
  toLogout = () => {
    $.ajax({
      method: 'DELETE',
      url: '/logout'
    })
      .done(data => {
        console.log(data)
      })
      .fail(error => {
        console.log(error)
      })
      .always(xhr => {
        this.props.actions.updateCurrentUser({...xhr.user})
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
          <a className="header__login" href="javascript:;">
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
