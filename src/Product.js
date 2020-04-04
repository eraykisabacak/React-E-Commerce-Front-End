import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
export default class Product extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardImg
            top
            width='100%'
            src={this.props.product.photo}
            alt='Card image cap'
          />
          <CardBody>
            <CardTitle>{this.props.product.name}</CardTitle>
            <CardSubtitle>
              <h4 class='text-warning'>{this.props.product.price} ₺</h4>
            </CardSubtitle>
            <CardText>{this.props.product.description}</CardText>
            <Button
              className='btn btn-success'
              onClick={() => this.props.addToCart(this.props.product)}
            >
              Sepete Ekle
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}
