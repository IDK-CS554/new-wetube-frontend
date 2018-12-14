import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {withRouter} from 'react-router';
import {
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	Button,
	Nav
} from "reactstrap";

import { changeRoomType, exitRoom } from "../actions/applicationActions";

const mapStateToProps = state => {
	return {
		roomType: state.application.roomType,
		videoId: state.application.videoId
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({changeRoomType, exitRoom}, dispatch);
};

class NavbarComponent extends Component {

	exitRoom = () => {
		this.props.exitRoom();
		this.props.history.replace('/');
	};

	render() {
		const {roomType, videoId, changeRoomType} = this.props;
		return (
			<React.Fragment>
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
							<Button color="danger" onClick={this.exitRoom}>Exit Room</Button>
						</NavItem>
					</Nav>
				</Navbar>
			</React.Fragment>
		);
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(NavbarComponent));
