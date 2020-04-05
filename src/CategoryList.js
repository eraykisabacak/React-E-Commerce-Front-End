import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class CategoryList extends Component {
  state = {
    categories: [],
    loading: true,
  };
  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    fetch('http://127.0.0.1:8080/api/category')
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data, loading: false }));
  };
  render() {
    return (
      <div>
        <h3>Category List</h3>
        <ListGroup>
          {this.state.loading ? (
            <div className='sweet-loading'>
              <BounceLoader
                css={override}
                size={120}
                color={'#123abc'}
                loading={this.state.loading}
              />
            </div>
          ) : (
            this.state.categories.map((category) =>
              category.status === 1 ? (
                <ListGroupItem
                  active={
                    category.name === this.props.currentCategory ? true : false
                  }
                  key={category.id}
                  onClick={() => this.props.changeCategory(category)}
                >
                  {category.name}
                </ListGroupItem>
              ) : (
                ''
              )
            )
          )}
        </ListGroup>
        {/* <h4>{this.props.currentCategory}</h4> */}
      </div>
    );
  }
}
