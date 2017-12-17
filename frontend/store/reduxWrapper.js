import React from 'react'
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'
import actions from './actions'

const store = createStore(
  combineReducers({
    ...reducers
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

const reduxWrapper = Component => {
  const NewComponent = connect(state => state, dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  ))(Component)

  const Wrapper = props => {
    console.log(props)
    return (
      <Provider store={store}>
        <NewComponent {...props} />
      </Provider>
    )
  }

  Wrapper.displayName = `ReduxWrapper(${Component.name})`
  return Wrapper
}

export default reduxWrapper
