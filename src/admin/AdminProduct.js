import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ProductAdd from './ProductAdd';
import CategoryAdd from './CategoryAdd';

export default class AdminProduct extends Component {
  state = {
    editing: false,
    editingCategory: false,
    categories: [],
    products: {
      id: '',
      name: '',
      status: 0,
      description: '',
      photo: '',
    },
    category: {},
  };
  componentDidMount() {
    this.getCategories();
  }

  editFunc = (p) => {
    console.log(p);
    this.setState({
      editing: true,
      products: p,
    });
  };

  editCategoryFunc = (p) => {
    console.log(p);
    this.setState({
      editingCategory: true,
      category: p,
    });
  };

  getCategories = () => {
    fetch('http://127.0.0.1:8080/api/category')
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };
  deleteCategoryItem = (id) => {
    let confirmDelete = window.confirm('Delete item forever?');
    if (confirmDelete) {
      fetch('http://127.0.0.1:8080/api/category/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    }
    this.getCategories();
  };
  deleteItem = (id) => {
    let confirmDelete = window.confirm('Delete item forever?');
    if (confirmDelete) {
      fetch('http://127.0.0.1:8080/api/urun/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    }
    this.props.getProducts();
  };

  render() {
    return (
      <div>
        <h1>Ürün Ekleme / Silme / Düzenleme</h1>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Ürün Adı</th>
              <th>Status</th>
              <th>Fiyat</th>
              <th>Stok</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((p, index) =>
              this.props.curretCategoryId === p.category_id ||
              this.props.curretCategoryId === 0 ? (
                <tr>
                  <th scope='row'>{index + 1}</th>
                  <td>{p.name}</td>
                  <td>{p.status}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <Button
                      outline
                      color='warning'
                      onClick={() => this.editFunc(p)}
                    >
                      Düzenle
                    </Button>
                  </td>
                  <td>
                    <Button
                      outline
                      color='danger'
                      onClick={() => this.deleteItem(p.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ) : (
                ''
              )
            )}
          </tbody>
        </Table>
        {this.state.editing ? (
          <ProductAdd products={this.state.products} />
        ) : (
          ''
        )}
        <h1>Kategori Ekleme / Silme / Düzenleme</h1>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Kategori Adı</th>
              <th>Kategori Id</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.categories.map((category, index) => (
              <tr>
                <th scope='row'>{index + 1}</th>
                <td>{category.name}</td>
                <td>{category.id}</td>
                <td>{category.status}</td>
                <td>{category.description}</td>
                <td>
                  <Button
                    outline
                    color='warning'
                    onClick={() => this.editCategoryFunc(category)}
                  >
                    Düzenle
                  </Button>
                </td>
                <td>
                  <Button
                    outline
                    color='danger'
                    onClick={() => this.deleteCategoryItem(category.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {this.state.editingCategory ? (
          <CategoryAdd category={this.state.category} />
        ) : (
          ''
        )}
      </div>
    );
  }
}
