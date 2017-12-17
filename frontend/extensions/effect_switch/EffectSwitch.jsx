import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './theme.scss'

const EffectSwitch = ({ condition, effect, children }) => {
  return (
    <ReactCSSTransitionGroup
      transitionName={`${effect}-switch`}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {
        condition ? children : null
      }
    </ReactCSSTransitionGroup>
  )
}

EffectSwitch.defaultProps = {
  effect: 'fade',
  condition: false,
  children: ''
}

EffectSwitch.propTypes = {
  condition: PropTypes.bool,
  effect: PropTypes.string,
  children: PropTypes.object
}


export default EffectSwitch
