import React, { Component } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import Navbar from "./Navbar";
import Results from "./VideoResults";
import gql from "graphql-tag";

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

export default class Room extends Component {
  state = {
    query: ""
  };

  searchVideo(e) {
    e.preventDefault();
    this.setState({ query: e.target.query.value });
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
                  <Input name="query" placeholder="Type Keyword(s)" />
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
