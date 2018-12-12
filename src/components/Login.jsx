import React, { Component } from 'react';
import { Button, Input, Label } from 'reactstrap';

class Login extends Component {

	state = {
		roomOption: null,
		username: '',
		roomId: ''
	};

	isButtonEnabled = () => {
		const {roomOption, username, roomId} = this.state;
		if (roomOption === null) {
			return false;
		} else if (roomOption === 0) {
			return username.trim().length !== 0;
		} else if (roomOption === 1) {
			return username.trim().length !== 0 && roomId.trim().length !== 0;
		} else {
			return false;
		}
	};

	enterRoom = () => {
		console.log('enter room here');
	};

	render() {
		const {roomOption, username, roomId} = this.state;
		console.log(this.state);
		return (
			<div className="login">

				<h4 className="header-text">What do you want to do?</h4>

				<div className="input-section">
					<Button className="create-room" color="primary" outline={roomOption !== 0} onClick={() => this.setState({
						...this.state,
						roomOption: 0
					})}>Create Room</Button>
					<Button className="join-room" color="primary" outline={roomOption !== 1} onClick={() => this.setState({
						...this.state,
						roomOption: 1
					})}>Join Room</Button>
				</div>

				{roomOption !== null &&
				<div className="input-section">
					<Label for="username">Username (required):</Label>
					<Input type="text" id="username" placeholder="Enter Username" value={username} onChange={(e) => this.setState({
						...this.state,
						username: e.target.value
					})}/>
				</div>}

				{roomOption === 1 &&
				<div className="input-section">
					<Label for="room">Room ID (required):</Label>
					<Input type="text" id="room" placeholder="Enter Room ID" value={roomId} onChange={(e) => this.setState({
						...this.state,
						roomId: e.target.value
					})}/>
				</div>}

				<Button className="submit" color="success" disabled={!this.isButtonEnabled()} onClick={() => this.enterRoom()}>Enter Room</Button>

			</div>
		)
	}
}

export default Login;