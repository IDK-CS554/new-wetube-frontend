import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Button, Nav, Container, Row, Col, Input, Card, CardImg, CardBody, CardSubtitle, CardTitle, CardText } from 'reactstrap';

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
							<div className="search-container">
								<h1 className="search-text">Search for videos</h1>
								<Input placeholder="Type Keyword(s)"/>
							</div>

							<div className="videos">
								<Row>
									{[...Array(4)].map((video, key) => {
										return (
											<Col lg="3" key={key}>
												<Card>
													<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
													<CardBody>
														<CardTitle>Card title</CardTitle>
														<CardSubtitle>Card subtitle</CardSubtitle>
														<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
														<Button>Button</Button>
													</CardBody>
												</Card>
											</Col>
										)
									})}
								</Row>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
};

export default Room;