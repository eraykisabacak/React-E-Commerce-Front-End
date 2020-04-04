import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import axios from 'axios';
import cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: '',
      admins: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleForm = (e) => {
    e.preventDefault();
    const data = { email: this.state.email, password: this.state.password };
    axios
      .post('http://127.0.0.1:8080/api/auth/login', data)
      .then((res) => {
        console.log(res);
        cookie.set('token', res.data.access_token);
        cookie.set('email', this.state.email);
        cookie.set('customer_id', res.data.user.id);
        this.state.admins.map((a) => {
          if (a.email === data.email) {
            cookie.set('adminStatus', true);
          }
        });
        this.setState({ isLoggedIn: true });
      })
      .catch((e) => this.setState({ errors: e.response.data }));
  };
  componentDidMount() {
    axios
      .get('http://127.0.0.1:8080/api/admin')
      .then((res) => this.setState({ admins: res.data }))
      .catch((err) => console.error(err));
  }

  render() {
    if (this.state.isLoggedIn || cookie.get('email')) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <h2>Sign In</h2>
        <Form onSubmit={this.handleForm}>
          <Col>
            {this.state.errors.error ? (
              <Alert color='danger'>Bilgileriniz Yanlış</Alert>
            ) : (
              ''
            )}
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
