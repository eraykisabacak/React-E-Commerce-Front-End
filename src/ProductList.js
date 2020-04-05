import React, { Component } from 'react';
import Product from './Product';
import { Row, Col } from 'reactstrap';

export default class ProductList extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Product List</h3>
        <h4></h4>
        <Row>
          {this.props.products.map((product) =>
            (this.props.curretCategoryId === product.category_id ||
              this.props.curretCategoryId === 0) &&
            product.status === 1 ? (
              <Col key={product.id} xs='4'>
                <Product addToCart={this.props.addToCart} product={product} />
              </Col>
            ) : (
              ''
            )
          )}
        </Row>
      </div>
    );
  }
}
