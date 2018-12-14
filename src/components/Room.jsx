import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Input } from "reactstrap";
import Navbar from "./Navbar";
import Results from "./VideoResults";
import gql from "graphql-tag";

import { getUsers } from "../actions/applicationActions";

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
		roomId: state.application.roomId
	}
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({getUsers}, dispatch);
};

class Room extends Component {
	state = {
		query: ""
	};

	searchVideo(e) {
		e.preventDefault();
		this.setState({query: e.target.query.value});
	}

	render() {
		const {query} = this.state;
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

								<hr/>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
