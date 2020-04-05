import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import AdminNavi from './AdminNavi';
import CategoryAdd from './CategoryAdd';
import ProductAdd from './ProductAdd';
import CategoryList from '../CategoryList';
import AdminProduct from './AdminProduct';
import cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';
import OrderList from './OrderList';

export default class AdminPage extends Component {
  state = {
    currentCategory: '',
    curretCategoryId: 0,
    products: [],
  };

  changeCategory = (category) => {
    this.setState({
      currentCategory: category.name,
      curretCategoryId: category.id,
    });
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    this.setState({ products: [] });
    fetch('http://127.0.0.1:8080/api/urun')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data });
        console.log(data);
      });
  };

  render() {
    if (!cookie.get('adminStatus')) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <AdminNavi />
        <Row>
          <Col xs='3'>
            <CategoryList
              currentCategory={this.state.currentCategory}
              changeCategory={this.changeCategory}
            />
          </Col>
          <Col xs='9'>
            <Switch>
              <Switch>
                <Route
                  exact
                  path='/admin'
                  render={(props) => (
                    <AdminProduct
                      curretCategoryId={this.state.curretCategoryId}
                      products={this.state.products}
                      currentCategory={this.state.currentCategory}
                      getProducts={this.getProducts}
                    />
                  )}
                />
                <Route exact path='/admin/categoryAdd'>
                  <CategoryAdd />
                </Route>
                <Route exact path='/admin/productAdd'>
                  <ProductAdd />
                </Route>
                <Route exact path='/admin/orderList'>
                  <OrderList />
                </Route>
              </Switch>
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}
