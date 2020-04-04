import React, { Component } from 'react';
import Navigasyon from './Navigasyon';
import { Row, Col } from 'reactstrap';
import './App.css';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import alertify from 'alertifyjs';
import { Switch, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import CartList from './CartList';
import Login from './userLogin/login';
import Register from './userLogin/register';
import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';
import AdressAdd from './AdressAdd';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class HomePage extends Component {
  state = {
    currentCategory: '',
    curretCategoryId: 0,
    products: [],
    cart: [],
    loadingProduct: true,
  };

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({
      currentCategory: category.name,
      curretCategoryId: category.id,
    });
  };

  getProducts = () => {
    fetch('http://127.0.0.1:8080/api/urun')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data, loadingProduct: false });
        console.log(data);
      });
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
      this.setState({ cart: newCart });
    }
    alertify.success(product.name + ' sepetinize eklenmiştir');
  };

  removeCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.name + ' sepetinizden çıkarılmıştır');
  };
  render() {
    return (
      <div>
        <Navigasyon cart={this.state.cart} removeCart={this.removeCart} />
        <Row>
          <Col xs='3'>
            <CategoryList
              currentCategory={this.state.currentCategory}
              changeCategory={this.changeCategory}
            />
          </Col>
          <Col xs='9'>
            <Switch>
              {this.state.loadingProduct ? (
                <div className='sweet-loading'>
                  <BounceLoader
                    css={override}
                    size={120}
                    color={'#123abc'}
                    loading={this.state.loadingProduct}
                  />
                </div>
              ) : (
                <Route
                  exact
                  path='/'
                  render={(props) => (
                    <ProductList
                      addToCart={this.addToCart}
                      curretCategoryId={this.state.curretCategoryId}
                      products={this.state.products}
                      currentCategory={this.state.currentCategory}
                    />
                  )}
                />
              )}

              <Route
                exact
                path='/cart'
                render={(props) => (
                  <CartList
                    cart={this.state.cart}
                    removeCart={this.removeCart}
                  />
                )}
              />
              <Route exact path='/adress' render={(props) => <AdressAdd />} />
              <Route exact path='/login' render={(props) => <Login />} />
              <Route exact path='/register' render={(props) => <Register />} />

              <Route component={ErrorPage} />
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}
