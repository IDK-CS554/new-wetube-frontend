import React, { Component } from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    videoId: state.application.videoId
  };
};

export class Watch extends Component {
  render() {
    const { videoId } = this.props;
    return (
      <div>
        <YouTube videoId={videoId} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Watch);
