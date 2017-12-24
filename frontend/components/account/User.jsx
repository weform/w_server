import React from 'react'
import PropTypes from 'prop-types'

import { observer, inject } from 'mobx-react'

const User = inject('profiles')(observer(
  ({ profiles, children }) => {
    const { avatar, username } = profiles.user
    return (
      <div className="user sidebar__user">
        <div className="user__avatar">
          <img src={avatar} alt={username} />
        </div>
        <div className="user__intro">
          <div className="user__name">{username}</div>
        </div>
        {children}
      </div>
    )
  }
))


User.propTypes = {
  profiles: PropTypes.object
}

export default User
