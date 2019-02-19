import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand } from 'reactstrap';


class App extends Component {
  render() {
    return (
    <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">TigerNest</NavbarBrand>
        </Navbar>
        <p> Welcome to TigerNest!</p>
      </div>    );
  }}

export default App;
