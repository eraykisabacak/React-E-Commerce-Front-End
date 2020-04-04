import React, { Component } from 'react';
import { Table, Col } from 'reactstrap';
import cookie from 'js-cookie';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      adres: [],
      loading: true,
      status: 1,
      customer_id: cookie.get('customer_id'),
      total_amount: 0,
      shipping_address_id: '',
      billing_address_id: '',
      basket_id: 0,
    };
  }

  componentDidMount() {
    this.getAdress();
    this.totalPrice();
  }

  totalPrice = () => {
    let total = 0;
    this.props.cart.map((p) => (total += p.product.price * p.quantity));
    this.setState({ price: total, total_amount: total });
  };

  getAdress = () => {
    axios.get('http://127.0.0.1:8080/api/adres').then((res) => {
      this.setState({ adres: res.data, loading: false });
      console.log(this.state.adres);
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleForm = (e) => {
    e.preventDefault();
    const data = {
      status: this.state.status,
      customer_id: this.state.customer_id,
      total_amount: this.state.total_amount,
      shipping_address_id: this.state.shipping_address_id,
      billing_address_id: this.state.billing_address_id,
    };
    console.log(data);

    axios
      .post('http://127.0.0.1:8080/api/sepet', data)
      .then((res) => {
        console.log(res);
        this.setState({ basket_id: res.data.id });
        this.props.cart.map((c) => {
          console.log('basket id' + this.state.basket_id);
          console.log('Product Id ' + c.product.id);
          console.log('Quantity' + c.quantity);
          console.log('Price' + c.product.price);
          const basket = {
            basket_id: this.state.basket_id,
            product_id: c.product.id,
            quantity: c.quantity,
            price: c.product.price,
          };
          axios
            .post('http://127.0.0.1:8080/api/sepetelemanlari', basket)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    if (!cookie.get('email')) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Ürün Adı</th>
              <th>Adet</th>
              <th>Fiyatı</th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map((c) => (
              <tr>
                <th scope='row'>
                  <Button
                    color='danger'
                    size='sm'
                    onClick={() => this.props.removeCart(c.product)}
                  >
                    X
                  </Button>
                </th>
                <td>{c.product.name}</td>
                <td>{c.quantity}</td>
                <td>{c.product.price}</td>
              </tr>
            ))}
            Toplam Fiyat:{this.state.price}
          </tbody>
        </Table>
        {this.props.cart.length > 0 ? (
          <Form onSubmit={this.handleForm}>
            <Col>
              <FormGroup>
                <Input
                  type='hidden'
                  name='total_amount'
                  id='total_amount'
                  value={this.state.price}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for='exampleSelect'>Shipping Adres</Label>
                <Input
                  type='select'
                  name='shipping_address_id'
                  id='shipping_address_id'
                  onChange={this.handleChange}
                >
                  <option value='0'></option>
                  {this.state.adres.map((a) =>
                    a.customer_id == cookie.get('customer_id') ? (
                      <option value={a.id}>{a.name}</option>
                    ) : (
                      ''
                    )
                  )}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for='exampleSelect'>Billing Adres</Label>
                <Input
                  type='select'
                  name='billing_address_id'
                  id='billing_address_id'
                  onChange={this.handleChange}
                >
                  <option value='0'></option>
                  {this.state.adres.map((a) =>
                    a.customer_id == cookie.get('customer_id') ? (
                      <option value={a.id}>{a.name}</option>
                    ) : (
                      ''
                    )
                  )}
                </Input>
              </FormGroup>
            </Col>
            <Button>Submit</Button>
          </Form>
        ) : (
          ''
        )}
        <Button href='/adress'>Lütfen Adres Ekleyin</Button>
      </div>
    );
  }
}
