import React from 'react'
import PropTypes from 'prop-types'

import { observer, inject } from 'mobx-react'

import { Row, Col } from 'react-flexbox-grid'
import ProgressBar from 'react-toolbox/lib/progress_bar'
// import Alert from 'react-s-alert'

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { addUidForUrl } from 'utils/tool'

import User from './User'
import Nav from './Nav'

import Profiles from './main/Profiles'
// import Security from './main/Security'
// import Authorizations from './main/Authorizations'

import { errorHandle } from './util'

@inject('profiles', 'app') @observer
class Account extends React.Component {
  componentWillMount () {
    $.ajaxSetup({
      beforeSend: (xhr, settings) => {
        settings.url = addUidForUrl(settings.url)
        this.props.app.isLoading = true
      },
      error: xhr => {
        errorHandle(xhr)
        this.props.app.isLoading = false
      },
      success: () => {
        this.props.app.isLoading = false
      }
    })
    this.props.profiles.fetch()
  }

  componentDidMount () {
    // this.props.flash.forEach(item => {
    //   if (item[0] === 'error') Alert.error(item[1])
    //   if (item[0] === 'success') Alert.success(item[1])
    // })
  }

  render () {
    return (
      <BrowserRouter basename="/account">
        <section className="u-container wrapper">
          <Row>
            <Col md={3} xs={12}>
              <section className="sidebar">
                <User />
                <Nav />
              </section>
            </Col>
            <Col md={9} xs={12}>
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/profiles" />} />
                <Route path="/profiles" component={Profiles} />
                {/* <Route path="/security" component={Security} /> */}
                {/* <Route path="/authorizations" component={Authorizations} /> */}
                <Route path="/*" render={() => <Redirect to="/profiles" />} />
              </Switch>
            </Col>
          </Row>
          <div className={`loading ${this.props.app.isLoading ? 'active' : ''}`}>
            <ProgressBar className="progress-bar" type="circular" mode="indeterminate" />
          </div>
        </section>
      </BrowserRouter>
    )
  }
}

Account.propTypes = {
  profiles: PropTypes.object,
  app: PropTypes.object
}

export default Account
