import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from '../../components/Routing/PrivateRoute'
import PublicRoute from '../../components/Routing/PublicRoute'
import {firebaseAuth}  from '../../components/Firebase/firebase'
import * as ROUTES from  '../../constants/routes'
import HomePage from '../Home'
import UserPage from '../UserPage'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import IndexPage from '../Index'
import './App.css';

export class App extends Component {
  state = {
    authed: false,
    loading: true,
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <Router>
        <div>
          <Switch>
            <Route path={ROUTES.INDEX} exact component={IndexPage} />
            <PublicRoute authed={this.state.authed} path={ROUTES.USER} component={UserPage} />
            <PublicRoute authed={this.state.authed} path={ROUTES.SIGN_UP} component={SignUp} />
            <PublicRoute authed={this.state.authed} path={ROUTES.SIGN_IN} component={SignIn} />
            <PrivateRoute exact authed={this.state.authed} path={ROUTES.HOME} component={HomePage} />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App