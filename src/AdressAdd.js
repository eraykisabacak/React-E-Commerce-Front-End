import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import axios from 'axios';
import cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';

export default class AdressAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id: 0,
      status: 1,
      type: '',
      name: '',
      address: '',
      city: '',
      tc_no: 0,
      mobile: '',
      phone: '',
      errors: '',
    };
  }
  handleForm = (e) => {
    e.preventDefault();
    const data = {
      customer_id: cookie.get('customer_id'),
      status: this.state.status,
      type: this.state.type,
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      tc_no: parseInt(this.state.tc_no),
      mobile: this.state.mobile,
      phone: this.state.phone,
    };
    axios
      .post('http://127.0.0.1:8080/api/adres', data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => this.setState({ errors: e.response.data }));
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (!cookie.get('email')) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <h2>Adres Ekleme</h2>
        <Form onSubmit={this.handleForm}>
          <Col>
            <FormGroup>
              <Input type='hidden' name='status' id='status' value='1' />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Type</Label>
              <Input
                type='text'
                name='type'
                id='type'
                placeholder='Type'
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Adres</Label>
              <Input
                type='adres'
                name='address'
                id='address'
                placeholder='Adres'
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>City</Label>
              <Input
                type='text'
                name='city'
                id='city'
                placeholder='City Istanbul,Ankara,Kastamonu'
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>T.C Kimlik No</Label>
              <Input
                type='text'
                name='tc_no'
                id='tc_no'
                maxLength={11}
                placeholder='00000000000'
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Mobile</Label>
              <Input
                type='text'
                name='mobile'
                id='mobile'
                maxLength={11}
                placeholder='Mobile'
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Phone</Label>
              <Input
                type='text'
                name='phone'
                id='phone'
                maxLength={11}
                placeholder='Phone'
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}
