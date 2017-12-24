import React from 'react'
import PropTypes from 'prop-types'

import Ripple from 'react-toolbox/lib/ripple'

const CustomButton = props => {
  const { children, theme, ...other } = props
  return (
    <a {...other} style={{ position: 'relative' }}>
      {children}
    </a>
  )
}

CustomButton.propTypes = {
  children: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
}

const RippleButton = Ripple({ spread: 1 })(CustomButton)

export default RippleButton
