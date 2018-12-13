import React, { Component } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import Navbar from "./Navbar";
import Results from "./VideoResults";
import gql from "graphql-tag";

const queryVideos = q => gql`
  {
    videos(q: q) {
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

class Room extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    console.log(queryVideos("hello"));
  }

  searchVideo(e) {
    e.preventDefault();
    this.setState({ query: e.target.value });
  }

  render() {
    const { query } = this.state;
    return (
      <div className="room">
        <Navbar />
        <Container fluid>
          <Row>
            <Col lg="9">
	            <form onSubmit={e => this.searchVideo(e)} className="search-container">
		            <h1 className="search-text">Search for videos</h1>
		            <Input placeholder="Type Keyword(s)" />
	            </form>

              {query && (
                <div className="videos">
                  <Results query={queryVideos(query)} />
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

export default Room;
