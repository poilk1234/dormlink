import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import LandingPage from '../pages/LandingPage';
import RegistrationPage from '../pages/RegistrationPage';

/* Protected route that redirects to LandingPage if user is not allowed access */
const PrivateRoute = ({ component, alternate, ...rest }) => {
  const [user, setUser] = useContext(UserContext);
  const destination = user.sid && true ? component : LandingPage;
  return <Route {...rest} component={destination} />;
};

/* Complete-Profile route that redirects to RegistrationPage if user is not fully registered */
const CompleteRoute = ({ component, alternate, ...rest }) => {
  const [user, setUser] = useContext(UserContext);
  const destination = user.isComplete && true ? component : RegistrationPage;
  return <Route {...rest} component={destination} />;
};

export { CompleteRoute, PrivateRoute };
