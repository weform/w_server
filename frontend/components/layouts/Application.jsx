import React from 'react'
import reduxWrapper from 'store/reduxWrapper'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css'

import Modal from 'extensions/modal/Modal'

import Header from '../shared/header/Header'

class Application extends React.Component {
  render () {
    const { actions, modal, children, currentUser } = this.props

    return (
      <div>
        <Header actions={actions} currentUser={currentUser} />
        {children}
        <Alert stack={{ limit: 3 }} timeout={3000} position="top-left" effect="bouncyflip" />
        <Modal {...modal} closeModal={actions.closeModal} />
      </div>
    )
  }
}

export default reduxWrapper(Application)
