import React, { useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from './utils/history';
import { UserContext } from './contexts/UserProvider';
import { PrivateRoute } from './utils/PrivateRoute';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import { EditPage, RegistrationPage } from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutUs';
import UserPage from './pages/UserPage';

export default function App() {
  /* Access user info from UserProvider.js */
  const [user, setUser] = useContext(UserContext);

  /* Render loading circle while fetching userContext */
  if (user.loading) return <CircularProgress />;

  /* Render Navigation Bar for all views */
  /* PrivateRoute is a custom, protected route only allowed for logged in users */
  /* Catch remaining unmatched URLs by rendering error/404 page */
  return (
    <Router history={history}>
      <Route path='/' component={NavBar} />
      <Switch>
        <Route exact path='/about' component={AboutPage} />
        <PrivateRoute exact path='/register' component={RegistrationPage} />
        <PrivateRoute exact path='/profile' component={ProfilePage} />
        <PrivateRoute exact path='/edit' component={EditPage} />
        <PrivateRoute exact path='/' component={HomePage} />
        <Route path='/user/:sid' component={UserPage} />
        <Route
          exact
          path='/error'
          render={() => <h2>Error: Something Went Wrong.</h2>}
        />
        <Route render={() => <h2>404 Page Not Found.</h2>} />
      </Switch>
    </Router>
  );
}
