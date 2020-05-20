import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ModalSwitch, ModalRoute } from "react-router-modal-gallery";
import { firebaseAuth, firestore } from '../../components/Firebase/firebase'

import PrivateRoute from '../../components/Routing/PrivateRoute'
import PublicRoute from '../../components/Routing/PublicRoute'
import * as ROUTE from  '../../constants/routes'

import HomePage from '../Home'
import UserPage from '../UserPage'
import EditUserPage from '../EditUserPage'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import IndexPage from '../Index'
import PostPage from '../PostPage';
import PlayPage from '../play';
import SettingsPage from '../settings';
import GameLibraryPage from '../gameLibrary'
import BlogPage from '../blog';
import DeveloperPage from '../developer';
import Page404 from '../page404';
import './App.css';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const [authed, isAuthed] = useState(false)
  const [loading, isLoading] = useState(true)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#fb8c00',
          },
          secondary: {
            main: '#f44336',
          },
          background: {
            default: '#202020',
          }
        },
      }),
    [prefersDarkMode],
  );
  const setUserOnline = () => {
    firestore().collection('users').doc(firebaseAuth().currentUser.uid)
      .set({ isActive: true }, { merge: true })
  }

  useEffect(()=> {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        isAuthed(true)
        isLoading(false)
        setUserOnline()
      } else {
        isAuthed(false)
        isLoading(false)
      }
    })
  })

  return loading === true ? <h1>Loading</h1> : (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <ModalSwitch
            renderModal={({ open, redirectToBack }) => (
              <div open={open} scroll="body" onExited={redirectToBack}>
                <ModalRoute
                  defaultParentPath={ROUTE.HOME}
                  path={`${ROUTE.HOME}/post/:id`}
                  component={PostPage}
                />
              </div>
            )}
          >
            <Route path={`${ROUTE.HOME}/post/:id`} component={PostPage} />
          </ModalSwitch>
          <ModalSwitch
            renderModal={({ open, redirectToBack }) => (
              <div open={open} scroll="body" onExited={redirectToBack}>
                <ModalRoute
                  defaultParentPath={ROUTE.USER}
                  path={`${ROUTE.USER}/post/:id`}
                  component={PostPage}
                />
              </div>
            )}
          >
            <Route path={`${ROUTE.USER}/post/:id`} component={PostPage} />
          </ModalSwitch>
          <Switch>
            <Route path={ROUTE.INDEX} exact component={IndexPage} />
            <PrivateRoute authed={authed} path={ROUTE.USER} component={UserPage} />
            <PrivateRoute authed={authed} path={ROUTE.EDIT} component={EditUserPage} />
            <PrivateRoute authed={authed} path={ROUTE.HOME} component={HomePage} />
            <PrivateRoute authed={authed} path={ROUTE.PLAY} component={PlayPage} />
            <PrivateRoute authed={authed} path={ROUTE.SETTINGS} component={SettingsPage}/>
            <PrivateRoute authed={authed} path={ROUTE.BLOG} component={BlogPage}/>
            <PrivateRoute authed={authed} path={ROUTE.DEVELOPER} component={DeveloperPage}/>
            <PrivateRoute authed={authed} path={ROUTE.GAMELIBARY} component={GameLibraryPage} />
            <PublicRoute authed={authed} path={ROUTE.SIGN_UP} component={SignUp} />
            <PublicRoute authed={authed} path={ROUTE.SIGN_IN} component={SignIn} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
    
    )
}

export default App