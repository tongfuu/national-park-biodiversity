import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
            <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">National Park Biodiversity</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/parks">
                Parks
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/search" >
                Search
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/trails" >
                Trails
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
