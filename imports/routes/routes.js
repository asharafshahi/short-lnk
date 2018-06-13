import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {withRouter} from 'react-router'
import createHistory from 'history/createBrowserHistory'
import Link from '../ui/Link';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createHistory();

const ChangeTracker = withRouter(({match, location, history}) => {
  console.log(action, location.pathname, location.state);
  return false;
});

const unauthenticatedPages = ['/', '/signup', '/login'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  console.log('isAuthenticated: ', isAuthenticated, 'location:', pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links');
  } 
  if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
};

export const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/links' component={Link} />
      <Route exact path='/' component={Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);