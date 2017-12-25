import React from 'react'
import RippleLink from './shared/RippleLink'

const Nav = () => {
  return (
    <nav className="nav sidebar__nav">
      <ul>
        <li>
          <RippleLink to="/profiles" activeClassName="active">
            <i className="iconfont icon-userinfo" />
            <span className="nav_title">基本信息</span>
          </RippleLink>
        </li>
        <li>
          <RippleLink to="/security" activeClassName="active">
            <i className="iconfont icon-safe" />
            <span className="nav_title">账户安全</span>
          </RippleLink>
        </li>
        <li>
          <RippleLink to="/authorizations" activeClassName="active">
            <i className="iconfont icon-iconbindtheuser" />
            <span className="nav_title">第三方授权</span>
          </RippleLink>
        </li>
        {/* <li>
          <RippleLink to="/email-subscriptions" activeClassName="active">
            <i className="iconfont icon-subscribe" />
            邮件订阅
          </RippleLink>
        </li> */}
      </ul>
    </nav>
  )
}


export default Nav
