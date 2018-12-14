import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Input, Label, Container, Row, Col } from "reactstrap";

import {
  connectToSocket,
  updateUsername,
  createRoom,
  joinRoom
} from "../actions/applicationActions";

const mapStateToProps = state => {
  return {
    username: state.application.username,
    searching: state.application.searching,
    connected: state.application.connected
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { connectToSocket, updateUsername, createRoom, joinRoom },
    dispatch
  );
};

class Login extends Component {
  state = {
    roomOption: null,
    roomId: "",
    errorText: null
  };

  componentDidMount() {
    this.props.connectToSocket();
  }

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.connected && !nextProps.searching) {
      return { errorText: "Room not found." };
    }

    return null;
  }

  isButtonEnabled = () => {
    const { roomOption, roomId } = this.state;
    const { username } = this.props;
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
    const { roomId, roomOption } = this.state;
    const { username, createRoom, joinRoom } = this.props;
    const roomIdInt = parseInt(roomId);

    if (roomOption === 0) {
      createRoom(username);
    } else {
      // join room
      if (isNaN(roomIdInt)) {
        // error handling
        this.setState({
          errorText: "Please enter a valid number."
        });
      } else {
        joinRoom(username, roomIdInt);
      }
    }
  };

  render() {
    const { roomOption, roomId, errorText } = this.state;
    const { updateUsername, username } = this.props;
    return (
      <Container>
        <Row>
          <Col lg="12">
            <form className="login" onSubmit={evt => this.enterRoom(evt)}>
              <h1 className="header-text">What do you want to do?</h1>
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
                    onChange={e => updateUsername(e.target.value)}
                  />
                </div>
              )}

              {roomOption === 1 && (
                <div>
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
                  {errorText !== null && (
                    <p className="text-danger">{errorText}</p>
                  )}
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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
