import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';

export default class CartSummary extends React.Component {
  render() {
    return (
      <div>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Sepet {this.props.cart.length}
          </DropdownToggle>
          {this.props.cart.length === 0 ? (
            ''
          ) : (
            <DropdownMenu right>
              {this.props.cart.map((c) => (
                <DropdownItem key={c.product.id}>
                  <Button
                    color='danger'
                    size='sm'
                    onClick={() => this.props.removeCart(c.product)}
                  >
                    X
                  </Button>{' '}
                  {c.product.name} / <Badge>{c.quantity} Adet</Badge>
                </DropdownItem>
              ))}
              <DropdownItem>
                {cookie.get('email') ? (
                  <Link to='/cart'>Sepete Git</Link>
                ) : (
                  <Link to='/login'>Giriş Yapınız</Link>
                )}
              </DropdownItem>
            </DropdownMenu>
          )}
        </UncontrolledDropdown>
      </div>
    );
  }
}
