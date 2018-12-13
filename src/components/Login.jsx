import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Input, Label } from "reactstrap";

import { connectToSocket, createRoom } from "../actions/applicationActions";

const mapDispatchToProps = dispatch => {
	return bindActionCreators({connectToSocket, createRoom}, dispatch);
};

class Login extends Component {
	state = {
		roomOption: null,
		username: "",
		roomId: ""
	};

	componentDidMount() {
		this.props.connectToSocket();
	}

	isButtonEnabled = () => {
		const {roomOption, username, roomId} = this.state;
		switch (roomOption) {
			case 0:
				return username.trim().length;
			case 1:
				return username.trim().length && roomId.trim().length;
			default:
				return false;
		}
	};

	setRoomOption = option => {
		this.setState({roomOption: option});
	};

	enterRoom = e => {
		e.preventDefault();
		const {username, roomId, roomOption} = this.state;
		if (roomOption === 0) {
			this.props.createRoom(username);
		} else {
			// join room
		}
	};

	render() {
		const {roomOption, username, roomId} = this.state;
		return (
			<form className="login" onSubmit={evt => this.enterRoom(evt)}>
				<h4 className="header-text">What do you want to do?</h4>
				<div className="input-section">
					<Button
						className="create-room"
						color="primary"
						outline={roomOption !== 0}
						onClick={() => this.setRoomOption(0)}
					>
						Create Room
					</Button>
					<Button
						className="join-room"
						color="primary"
						outline={roomOption !== 1}
						onClick={() => this.setRoomOption(1)}
					>
						Join Room
					</Button>
				</div>

				{roomOption !== null && (
					<div className="input-section">
						<Label for="username">Username (required):</Label>
						<Input
							type="text"
							id="username"
							placeholder="Enter Username"
							value={username}
							onChange={e => this.setState({username: e.target.value})}
						/>
					</div>
				)}

				{roomOption === 1 && (
					<div className="input-section">
						<Label for="room">Room ID (required):</Label>
						<Input
							type="text"
							id="room"
							placeholder="Enter Room ID"
							value={roomId}
							onChange={e => this.setState({roomId: e.target.value})}
						/>
					</div>
				)}

				<Button
					className="submit"
					color="success"
					disabled={!this.isButtonEnabled()}
					type="submit"
				>
					Enter Room
				</Button>
			</form>
		);
	}
}

export default connect(null, mapDispatchToProps)(Login);