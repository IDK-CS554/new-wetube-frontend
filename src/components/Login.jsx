import React, { Component } from "react";
import { Button, Input, Label } from "reactstrap";
import io from "socket.io-client";

export default class Login extends Component {
  state = {
    roomOption: null,
    username: "",
    roomId: ""
  };

  componentDidMount() {
    const socket = io("http://localhost:5000");
    this.setState({ socket });
  }

  isButtonEnabled = () => {
    const { roomOption, username, roomId } = this.state;
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
    this.setState({ roomOption: option });
  };

  enterRoom = e => {
    e.preventDefault();
    const { username, roomId, roomOption } = this.state;
    if (roomOption === 1) {
      this.state.socket.emit("joinRoom", { username, roomId });
    } else {
      this.state.socket.emit("createRoom", { username });
    }
  };

  render() {
    const { roomOption, username, roomId } = this.state;
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
              onChange={e => this.setState({ username: e.target.value })}
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
              onChange={e => this.setState({ roomId: e.target.value })}
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
