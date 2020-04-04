import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
} from 'reactstrap';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';

export default class Navigasyon extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleLogout = (e) => {
    cookie.remove('email');
    cookie.remove('token');
    cookie.remove('adminStatus');
    cookie.remove('customer_id');
    return <Redirect to='/' />;
  };

  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>E - Ticaret</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {cookie.get('adminStatus') === 'true' ? (
                <NavItem>
                  <NavItem>
                    <NavLink href='/admin'>Admin Sayfası</NavLink>
                  </NavItem>
                </NavItem>
              ) : (
                ''
              )}
              {cookie.get('email') ? (
                <NavItem>
                  <NavItem>
                    <NavLink>{cookie.get('email')}</NavLink>
                  </NavItem>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLink href='/login'>Giriş Yap</NavLink>
                </NavItem>
              )}
              {cookie.get('email') ? (
                <Link className='nav-link' to='/' onClick={this.handleLogout}>
                  Logout
                </Link>
              ) : (
                <NavItem>
                  <NavLink href='/register'>Kayıt Ol</NavLink>
                </NavItem>
              )}
              <CartSummary
                removeCart={this.props.removeCart}
                cart={this.props.cart}
              />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
