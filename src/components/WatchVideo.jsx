import React, { Component } from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { Col } from "reactstrap";

import {playVideo as playVideoSocket, pauseVideo as pauseVideoSocket} from '../utilities/socketClient';

const mapStateToProps = state => {
  return {
    roomId: state.room.roomId,
    videoId: state.room.videoId,
    videoPlaying: state.room.videoPlaying
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
}

let videoPlayer;

export class Watch extends Component {

  _onReady(event) {
    // access to player in all event handlers via event.target
    if (videoPlayer === undefined) {
	    videoPlayer = event.target;
    }
    console.log('ready', videoPlayer);
    event.target.pauseVideo();
  }

  onPlay = () => {
	  playVideoSocket(this.props.roomId);
  }

  onPause = () => {
    pauseVideoSocket(this.props.roomId);
  }

  componentWillUnmount() {
	  videoPlayer = undefined;
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.videoPlaying === true && videoPlayer !== undefined) {
      videoPlayer.playVideo();
    } else if (nextProps.videoPlaying === false && videoPlayer !== undefined) {
      videoPlayer.pauseVideo();
    }
    return null;
  }

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
	            enablejsapi: 1,
              autoplay: 1
            }
          }}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onReady={this._onReady}
        />
      </Col>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Watch);
