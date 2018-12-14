import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Input } from "reactstrap";
import Navbar from "./Navbar";
import Results from "./VideoResults";
import gql from "graphql-tag";

import { getUsers } from "../actions/applicationActions";

const SYSTEM = 'SYSTEM';

const queryVideos = q => gql`
  query VideoQuery {
    videos(q: "${q}") {
      videoId
      title
      thumbnails {
        default {
          url
        }
      }
    }
  }
`;

const mapStateToProps = state => {
	return {
		roomId: state.application.roomId,
		users: state.application.users
	}
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({getUsers}, dispatch);
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
				chat: [...prevState.chat, chatObject(SYSTEM, `${newUsers[newUsers.length - 1].username} has joined!`)]
			}
		}
		return null;
	};

	searchVideo(e) {
		e.preventDefault();
		this.setState({query: e.target.query.value});
	}

	render() {
		const {query, chat} = this.state;
		console.log('render', this.props);
		return (
			<div className="room">
				<Navbar/>
				<Container fluid>
					<Row>
						<Col lg="9">
							<form onSubmit={e => this.searchVideo(e)} className="search-container">
								<h1 className="search-text">Search for videos</h1>
								<Input name="query" placeholder="Type Keyword(s)"/>
							</form>

							{query && (
								<div className="videos">
									<Results query={queryVideos(query)}/>
								</div>
							)}
						</Col>

						<Col lg="3" className="chat-column">
							<div className="chat-container">
								<Input type="text" placeholder="Type message..."/>

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

export default connect(mapStateToProps, mapDispatchToProps)(Room);
