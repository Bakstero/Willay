import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {firebaseAuth}  from '../../components/Firebase/firebase'
import HomePage from '../Home'
import UserPage from '../UserPage'
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
            <Route path={`/`} exact component={IndexPage} />
            <Route path={`/user:id`} component={UserPage} />
            <Route authed={this.state.authed} path={`/home`} component={HomePage} />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App