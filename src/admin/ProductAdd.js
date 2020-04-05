import React, { Component } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

export default class ProductAdd extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    if (this.props.products) {
      this.state = {
        id: '' || this.props.products.id,
        name: '' || this.props.products.name,
        category_id: '' || this.props.products.category_id,
        price: '' || this.props.products.price,
        stock: '' || this.props.products.stock,
        description: '' || this.props.products.description,
        photo: '' || this.props.products.photo,
        status: '' || this.props.products.status,
      };
    } else {
      this.state = {
        name: '',
        category_id: '',
        price: '',
        stock: '',
        description: '',
        photo: '',
        status: 0,
      };
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      this.name === '' &&
      this.category_id === '' &&
      this.price === '' &&
      this.stock === '' &&
      this.description === '' &&
      this.photo === ''
    ) {
      console.log('Bütün alanları doldurunuz');
      return;
    }
    const data = {
      name: this.state.name,
      category_id: this.state.category_id,
      price: this.state.price,
      stock: this.state.stock,
      description: this.state.description,
      photo: this.state.photo,
      status: this.state.status,
    };
    axios
      .post('http://127.0.0.1:8080/api/urun', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    this.resetForm();
  };

  handleUpdate = (event) => {
    event.preventDefault();
    if (
      this.name === '' &&
      this.category_id === '' &&
      this.price === '' &&
      this.stock === '' &&
      this.description === '' &&
      this.photo === ''
    ) {
      console.log('Bütün alanları doldurunuz');
      return;
    }
    const data = {
      name: this.state.name,
      category_id: this.state.category_id,
      price: this.state.price,
      stock: this.state.stock,
      description: this.state.description,
      photo: this.state.photo,
      status: this.state.status,
    };
    console.log(event.target);
    axios
      .put('http://127.0.0.1:8080/api/urun/' + this.state.id, data)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    this.resetForm();
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetForm = () => {
    this.setState({
      name: '',
      category_id: '',
      price: '',
      stock: '',
      description: '',
      photo: '',
    });
  };

  render() {
    console.log(this.props);
    return (
      <form onSubmit={this.state.id ? this.handleUpdate : this.handleSubmit}>
        <h1>Ürün Ekleme</h1>
        <FormGroup>
          <Label for='name'>Ürün Adı</Label>
          <Input
            type='text'
            name='name'
            id='name'
            placeholder='with a Ürün Adı'
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='category'>Kategory ID</Label>
          <Input
            type='text'
            name='category_id'
            id='category_id'
            placeholder='with a placeholder'
            value={this.state.category_id}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='exampleEmail'>Fiyat</Label>
          <Input
            type='text'
            name='price'
            id='price'
            placeholder='with a price'
            value={this.state.price}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='exampleEmail'>Stok</Label>
          <Input
            type='text'
            name='stock'
            id='stock'
            placeholder='with a Stock'
            value={this.state.stock}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='exampleEmail'>Açıklama</Label>
          <Input
            type='text'
            name='description'
            id='description'
            placeholder='with a Description'
            value={this.state.description}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='exampleEmail'>Fotoğraf</Label>
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
              onChange={(e) =>
                e.target.checked
                  ? this.setState({ status: 1 })
                  : this.setState({ status: 0 })
              }
            />{' '}
            Durum
          </Label>
        </FormGroup>
        <Button type='submit'>Kaydet</Button>
      </form>
    );
  }
}
