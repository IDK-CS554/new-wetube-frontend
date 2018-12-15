import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row, Col, Input } from "reactstrap";
import Navbar from "./Navbar";
import Choose from "./ChooseVideo";
import Watch from "./WatchVideo";
import WebRTC from "./videoChat/WebRTC";

import { getUsers, sendText } from "../actions/applicationActions";

const SYSTEM = "SYSTEM";

const mapStateToProps = state => {
  return {
    roomId: state.room.roomId,
    users: state.room.users,
    roomType: state.room.roomType,
    username: state.application.username,
    chat: state.room.chat
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUsers, sendText }, dispatch);
};

class Room extends Component {
  /**
   * Chat is an array of ChatObjects, where each ChatObject is
   * {
   *   username: *username of the person in the chat (SYSTEM are system-generated messages)*,
   *   text: *text of the message*
   * }
   */
  state = {
    query: "",
    users: []
  };

  searchVideo(e) {
    e.preventDefault();
    this.setState({ query: e.target.query.value });
  }

  handleEnter = e => {
    const text = e.target.value;
    if (e.key === "Enter" && text.trim().length > 0) {
      this.props.sendText(text, this.props.username, this.props.roomId);
      e.target.value = "";
    }
  };

  render() {
    const { query } = this.state;
    const { roomType, chat, roomId } = this.props;
    return (
      <div className="room">
        <Navbar />
        <Container fluid>
          <Row>
            {roomType === "choose" && (
              <Choose query={query} searchVideo={this.searchVideo.bind(this)} />
            )}
            {roomType === "watch" && <Watch />}

            <Col lg="3" className="chat-column">
              <div className="chat-container">
                <Input
                  type="text"
                  placeholder="Type message..."
                  onKeyUp={e => this.handleEnter(e)}
                />

                {chat.map((chatObject, index) => {
                  return chatObject.roomId === roomId ? (
                    <p className="text" key={index}>
                      {chatObject.username !== SYSTEM &&
                        `${chatObject.username}: `}
                      {chatObject.text}
                    </p>
                  ) : (
                    ""
                  );
                })}
              </div>
            </Col>
          </Row>
          <WebRTC />
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
