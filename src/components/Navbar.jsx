import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	Button,
	Nav
} from "reactstrap";

import { changeRoomType } from "../actions/applicationActions";

const mapStateToProps = state => {
	return {
		roomType: state.application.roomType,
		videoId: state.application.videoId
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({changeRoomType}, dispatch);
};

class NavbarComponent extends Component {
	render() {
		const {roomType, videoId, changeRoomType} = this.props;
		return (
			<div>
				<Navbar expand="lg">
					<NavbarBrand href="/">WeTube</NavbarBrand>
					<NavbarToggler className="mr-2"/>
					<Nav className="ml-auto" navbar>
						{roomType === "watch" && videoId && (
							<NavItem>
								<Button onClick={() => changeRoomType()} color="default">
									Choose Another Video
								</Button>
							</NavItem>
						)}
						<NavItem>
							<Button color="danger">Exit Room</Button>
						</NavItem>
					</Nav>
				</Navbar>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavbarComponent);
