import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
    };
  }
  componentDidMount() {
    this.getOrder();
  }

  getOrder = () => {
    // Create a new array based on current state:
    //let order = [...this.state.order];
    axios
      .get('http://127.0.0.1:8080/api/sepetelemanlari')
      .then((res) => {
        res.data.map((d) => {
          axios
            .get('http://127.0.0.1:8080/api/urun/' + d.product_id)
            .then((res) => {
              console.log(res);
              let order = [...this.state.order];
              console.log(res.data);
              order.push({ value: res.data });
              this.setState({ order: order });
            });
        });
      })

      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h2>Sipariş Listesi</h2>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Ürün Adı</th>
              <th>Fiyat</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {this.state.order.map((p, index) => (
              <tr>
                <th scope='row'>{index + 1}</th>
                <td>{p.value.name}</td>
                <td>{p.value.price}</td>
                <td>{p.value.stock}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
