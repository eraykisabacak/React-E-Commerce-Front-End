import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import axios from 'axios';
import cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {},
      isLoggedIn: false,
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleForm = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post('http://127.0.0.1:8080/api/auth/register', data)
      .then((res) => {
        cookie.set('token', res.data.access_token);
        cookie.set('email', this.state.email);
        this.setState({ isLoggedIn: true });
      })
      .catch((e) => this.setState({ errors: e.response }));
  };
  render() {
    if (this.state.isLoggedIn || cookie.get('email')) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <h2>Kayıt Ol</h2>
        <Form onSubmit={this.handleForm}>
          <Col>
            {this.state.errors.error ? (
              <Alert color='danger'>Bilgileriniz Yanlış</Alert>
            ) : (
              ''
            )}
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
              <Label>Email</Label>
              <Input
                type='email'
                name='email'
                id='exampleEmail'
                placeholder='myemail@email.com'
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for='examplePassword'>Password</Label>
              <Input
                type='password'
                name='password'
                id='examplePassword'
                placeholder='********'
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
