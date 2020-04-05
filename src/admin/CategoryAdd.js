import React, { Component } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

export default class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    if (this.props.category) {
      this.state = {
        id: '' || this.props.category.id,
        name: '' || this.props.category.name,
        description: '' || this.props.category.description,
        photo: '' || this.props.category.photo,
        status: '' || this.props.category.status,
      };
    } else {
      this.state = {
        name: '',
        description: '',
        photo: '',
        status: 0,
      };
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.name === '' && this.description === '' && this.photo === '') {
      console.log('Bütün alanları doldurunuz');
      return;
    }
    const data = {
      name: this.state.name,
      category_id: this.state.category_id,
      description: this.state.description,
      photo: this.state.photo,
      status: this.state.status,
    };
    axios
      .post('http://127.0.0.1:8080/api/category', data)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    this.resetForm();
  };

  handleUpdate = (event) => {
    event.preventDefault();
    if (
      this.name === '' &&
      this.category_id === '' &&
      this.description === '' &&
      this.photo === ''
    ) {
      console.log('Bütün alanları doldurunuz');
      return;
    }
    const data = {
      name: this.state.name,
      category_id: this.state.category_id,
      description: this.state.description,
      photo: this.state.photo,
      status: this.state.status,
    };
    console.log(data);
    axios
      .put('http://127.0.0.1:8080/api/category/' + this.state.id, data)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    this.resetForm();
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetForm = () => {
    this.setState({ name: '', description: '', photo: '' });
  };

  render() {
    return (
      <form onSubmit={this.state.id ? this.handleUpdate : this.handleSubmit}>
        <h1>Kategory Ekleme</h1>
        <FormGroup>
          <Label for='name'>Kategory Name</Label>
          <Input
            type='text'
            name='name'
            id='name'
            placeholder='with a placeholder'
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='description'>Description</Label>
          <Input
            type='text'
            name='description'
            id='description'
            placeholder='with a placeholder'
            value={this.state.description}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='photo'>Photo URL</Label>
          <Input
            type='text'
            name='photo'
            id='photo'
            placeholder='with a photo'
            value={this.state.photo}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type='checkbox'
              id='status'
              name='status'
              checked={this.state.status}
              value={this.state.status}
              onChange={(e) =>
                e.target.checked
                  ? this.setState({ status: 1 })
                  : this.setState({ status: 0 })
              }
            />{' '}
            Durum
          </Label>
        </FormGroup>
        *Tüm alanları doldurunuz yoksa kayıt edilmeyecektir
        <Button type='submit'>Kaydet</Button>
      </form>
    );
  }
}
