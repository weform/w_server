import React from 'react'
import PropTypes from 'prop-types'

import { observer, inject } from 'mobx-react'

import Dialog from 'react-toolbox/lib/dialog'

const Comfim = inject('app')(observer(
  ({ app }) => {
    const { confimOptions, dialogStatus, closeDialog } = app

    return (
      <Dialog
        actions={[
          { label: '取消', onClick: () => { closeDialog(); confimOptions.cancelFunc() } },
          { label: '确认', onClick: () => { closeDialog(); confimOptions.ensureFunc() } }
        ]}
        active={dialogStatus === 'confim'}
        onEscKeyDown={closeDialog}
        onOverlayClick={closeDialog}
        title={confimOptions.title}
        type="small"
      >
        <h3>{confimOptions.text}</h3>
      </Dialog>
    )
  }
))


Comfim.propTypes = {
  app: PropTypes.object
}

export default Comfim
