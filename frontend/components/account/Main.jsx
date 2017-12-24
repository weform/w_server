import React from 'react'
import { Provider } from 'mobx-react'
import Alert from 'react-s-alert'
import Confim from './shared/Confim'

import Account from './Account'
import * as store from './store'

class Main extends React.Component {
  render () {
    return (
      <Provider {...store}>
        <div>
          <Account />
          <Alert stack={{ limit: 3 }} timeout={3000} position="top-right" effect="bouncyflip" />
          <Confim />
        </div>
      </Provider>
    )
  }
}

export default Main
