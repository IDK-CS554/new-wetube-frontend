import React, { Component } from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";
import { Col } from "reactstrap";

const mapStateToProps = state => {
  return {
    videoId: state.room.videoId
  };
};

export class Watch extends Component {
  render() {
    const { videoId } = this.props;
    return (
      <Col lg="9">
        <YouTube
          videoId={videoId}
          opts={{
            height: "100%",
            width: "100%",
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1
            }
          }}
        />
      </Col>
    );
  }
}

export default connect(mapStateToProps)(Watch);
