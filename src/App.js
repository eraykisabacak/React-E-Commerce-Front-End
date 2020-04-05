import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AdminPage from './admin/AdminPage';
import ErrorPage from './ErrorPage';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Container>
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/cart'>
              <HomePage />
            </Route>
            <Route exact path='/register'>
              <HomePage />
            </Route>
            <Route exact path='/login'>
              <HomePage />
            </Route>
            <Route exact path='/adress'>
              <HomePage />
            </Route>
            <Route exact path='/admin/categoryAdd'>
              <AdminPage />
            </Route>
            <Route exact path='/admin/productAdd'>
              <AdminPage />
            </Route>
            <Route exact path='/admin/orderList'>
              <AdminPage />
            </Route>
            <Route exact path='/admin'>
              <AdminPage />
            </Route>
            <Route component={ErrorPage} />
          </Switch>
        </Container>
      </div>
    );
  }
}
