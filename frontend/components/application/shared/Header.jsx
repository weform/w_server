import React from 'react'
import Login from '../../shared/account/Login'

const Header = ({ actions }) => {
  return (
    <header className="header">
      <div className="header__logo">
        VForm 微表单
      </div>
      <div className="header__right">
        <a className="header__button" href="javascript:;">
          下载APP
        </a>
        <a
          className="header__login"
          href="javascript:;"
          onClick={() => actions.openModal(<Login />)}
        >
          登陆
        </a>
        <span>/</span>
        <a className="header__login" href="javascript:;">
          注册
        </a>
      </div>
    </header>
  )
}

export default Header
