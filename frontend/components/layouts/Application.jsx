import React from 'react'
import reduxWrapper from 'store/reduxWrapper'

import Modal from 'extensions/modal/Modal'

import Header from '../shared/header/Header'

class Application extends React.Component {
  render () {
    const { actions, modal, children, currentUser } = this.props

    return (
      <div>
        <Header actions={actions} currentUser={currentUser} />
        {children}
        <Modal {...modal} closeModal={actions.closeModal} />
      </div>
    )
  }
}

export default reduxWrapper(Application)
