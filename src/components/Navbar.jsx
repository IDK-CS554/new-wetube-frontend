import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Button, Nav } from "reactstrap";

export default class extends Component {
  state = {
    inRoom: true
  };
  render() {
    const { inRoom } = this.state;
    return (
      <div>
        <Navbar expand="lg">
          <NavbarBrand href="/">WeTube</NavbarBrand>
          <NavbarToggler className="mr-2" />
          {inRoom && (
            <Nav className="ml-auto" navbar>
              <Button color="danger">Leave Room</Button>
            </Nav>
          )}
        </Navbar>
      </div>
    );
  }
}
