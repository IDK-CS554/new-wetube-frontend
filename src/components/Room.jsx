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
        <Container>
          <Row>
            <Col lg="12">
              <div className="search-container">
                <form onSubmit={e => this.searchVideo(e)}>
                  <h1 className="search-text">Search for videos</h1>
                  <Input placeholder="Type Keyword(s)" />
                </form>
              </div>

              {query && (
                <div className="videos">
                  <Results query={queryVideos(query)} />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Room;
