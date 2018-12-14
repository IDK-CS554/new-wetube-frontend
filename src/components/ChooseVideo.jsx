import React from "react";
import { Col, Input } from "reactstrap";
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

export default ({ query, searchVideo }) => {
  return (
    <Col lg="9">
      <form onSubmit={e => searchVideo(e)} className="search-container">
        <h1 className="search-text">Search for videos</h1>
        <Input name="query" placeholder="Type Keyword(s)" />
      </form>

      {query && (
        <div className="videos">
          <Results query={queryVideos(query)} />
        </div>
      )}
    </Col>
  );
};
