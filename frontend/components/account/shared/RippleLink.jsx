import React from 'react'
import PropTypes from 'prop-types'

import Ripple from 'react-toolbox/lib/ripple'
import { NavLink } from 'react-router-dom'

const CustomLink = props => {
  const { children, theme, ...other } = props
  return (
    <NavLink {...other} strict style={{ position: 'relative' }}>
      {children}
    </NavLink>
  )
}

CustomLink.propTypes = {
  children: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
}

const RippleLink = Ripple({ spread: 1 })(CustomLink)

export default RippleLink
