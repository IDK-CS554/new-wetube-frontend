import React, { Component } from "react";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Col } from "reactstrap";

import {
  playVideo as playVideoSocket,
  pauseVideo as pauseVideoSocket,
  seekVideo as seekVideoSocket
} from "../utilities/socketClient";

const mapStateToProps = state => {
  return {
    roomId: state.room.roomId,
    videoId: state.room.videoId,
    username: state.application.username,
    roomCreator: state.room.creator,
    currTime: state.room.currTime,
    videoPlaying: state.room.videoPlaying
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

let currTime, videoPlayer, isCreator;
export class Watch extends Component {
  onPlay = () => {
    seekVideoSocket(this.props.roomId, videoPlayer.getCurrentTime());
    // playVideoSocket(this.props.roomId);
  };

  onPause = e => {
    pauseVideoSocket(this.props.roomId);
  };

  ref = player => {
    videoPlayer = player;
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.currTime !== currTime && !isCreator && videoPlayer) {
      currTime = nextProps.currTime;
      videoPlayer.getInternalPlayer().seekTo(nextProps.currTime);
    }
  }

  componentDidMount() {
    const { roomCreator, username } = this.props;
    isCreator = roomCreator === username;
  }
  componentWillUnmount() {
    currTime = undefined;
    videoPlayer = undefined;
    isCreator = undefined;
  }

  render() {
    const { videoId, videoPlaying, username, roomCreator } = this.props;
    return (
      <Col lg="9">
        <h1>Creator: {this.props.roomCreator}</h1>
        <h1>Username: {this.props.username}</h1>
        <h1>
          isCreator:
          {this.props.username === this.props.roomCreator ? "yes" : "no"}
        </h1>
        <ReactPlayer
          url={`https://youtube.com/watch?v=${videoId}`}
          ref={this.ref}
          onPlay={e => this.onPlay(e)}
          onPause={this.onPause}
          controls={username === roomCreator}
          playing={videoPlaying}
          height={"100%"}
          width={"100%"}
          config={{
            youtube: {
              playerVars: { autoplay: 0 }
            }
          }}
        />
      </Col>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Watch);
