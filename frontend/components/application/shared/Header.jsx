import React from 'react'

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        VForm 微表单
      </div>
      <div className="header__right">
        <a className="header__button" href="javascript:;">
          下载APP
        </a>
        <a className="header__login" href="javascript:;">
          登陆
        </a>
      </div>
    </header>
  )
}

export default Header
