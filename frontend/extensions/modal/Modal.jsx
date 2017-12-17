import React from 'react'
import PropTypes from 'prop-types'

import EffectSwitch from '../effect_switch/EffectSwitch'
import './theme.scss'

const Modal = ({ type, effect, Component, closeModal }) => {
  const condition = type === 'show'

  return (
    <div className="modal-layer">
      <EffectSwitch effect={effect} condition={condition}>
        <div className="modal-layer__container">
          {Component}
        </div>
      </EffectSwitch>
      <EffectSwitch condition={condition}>
        <div className="modal-layer__mask" onClick={() => closeModal()} />
      </EffectSwitch>
    </div>
  )
}

Modal.defaultProps = {
  type: 'hide',
  effect: 'slide',
  Component: null,
  closeModal: () => {}
}

Modal.propTypes = {
  type: PropTypes.string,
  effect: PropTypes.string,
  Component: PropTypes.element,
  closeModal: PropTypes.func
}

export default Modal
