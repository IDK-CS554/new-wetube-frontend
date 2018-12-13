import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Button, Nav, Container, Row, Col } from 'reactstrap';

class Room extends Component {
	render() {
		return (
			<div className="room">
				<Navbar expand="lg">
					<NavbarBrand href="/">WeTube</NavbarBrand>
					<NavbarToggler className="mr-2"/>

					<Nav className="ml-auto" navbar>
						<Button color="danger">Leave Room</Button>
					</Nav>
				</Navbar>

				<Container>
					<Row>
						<Col lg="12">
							<h1>Test</h1>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
};

export default Room;