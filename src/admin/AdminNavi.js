import React, { PureComponent } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';
export default class AdminNavi extends PureComponent {
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
  render() {
    return (
      <div>
        <Navbar color='light' fixed light expand='md'>
          <NavbarBrand href='/admin'>Admin Panel</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink href='/admin/categoryAdd'>Kategory Ekle</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/admin/productAdd'>Ürün Ekle</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/admin/orderList'>Sipariş Listesi</NavLink>
              </NavItem>
            </Nav>
            <Nav navbar>
              <NavItem>
                <NavLink href='/'>Müşteri Anasayfası</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
