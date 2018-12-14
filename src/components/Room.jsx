import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row, Col, Input } from "reactstrap";
import Navbar from "./Navbar";
import Choose from "./ChooseVideo";
import Watch from "./WatchVideo";

import { getUsers, changeRoomType } from "../actions/applicationActions";

const SYSTEM = 'SYSTEM';

const mapStateToProps = state => {
	return {
		roomId: state.application.roomId,
		users: state.application.users,
		roomType: state.application.roomType
	}
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUsers, changeRoomType }, dispatch);
};

const chatObject = (username, text) => {
	return {
		username,
		text
	}
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
		chat: [],
		users: []
	};

	constructor(props) {
		super(props);

		console.log('constructor', props);
	}

	static getDerivedStateFromProps = (nextProps, prevState) => {
		console.log('in derived', nextProps, prevState);
		if (nextProps.users.length !== prevState.users.length) {
			let newUsers = nextProps.users.filter(user => !prevState.users.includes(user));
			return {
				users: nextProps.users,
				chat: [chatObject(SYSTEM, `${newUsers[newUsers.length - 1].username} has joined!`), ...prevState.chat]
			}
		}
		return null;
	};

  searchVideo(e) {
    e.preventDefault();
    this.setState({ query: e.target.query.value });
  }

  render() {
    const { query, chat } = this.state;
    const { roomType } = this.props;
    return (
      <div className="room">
        <Navbar />
        <Container fluid>
          <Row>
            {roomType === "choose" && (
              <Choose
                query={query}
                searchVideo={this.searchVideo.bind(this)}
                changeRoomType={this.props.changeRoomType.bind(this)}
              />
            )}
            {roomType === "watch" && (
              <Watch changeRoomType={this.props.changeRoomType.bind(this)} />
            )}
            <Col lg="3" className="chat-column">
              <div className="chat-container">
                <Input type="text" placeholder="Type message..." />

	              {chat.map((chatObject, index) => {
		              return <p className="text" key={index}>{chatObject.text}</p>
	              })}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
