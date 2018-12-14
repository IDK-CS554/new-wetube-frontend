import ReactPlayer from "react-player";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  joinVideoChat
} from "../utilities/socketClient";
var RTCPeerConnection =
  window.RTCPeerConnection ||
  window.mozRTCPeerConnection ||
  window.webkitRTCPeerConnection ||
  window.msRTCPeerConnection;
var RTCSessionDescription =
  window.RTCSessionDescription ||
  window.mozRTCSessionDescription ||
  window.webkitRTCSessionDescription ||
  window.msRTCSessionDescription;

const mapStateToProps = state => {
  return {
    roomId: state.application.roomId
  };
};

const constraints = (window.constraints = {
  audio: true,
  video: true
});

var twilioIceServers = [
  { url: "stun:global.stun.twilio.com:3478?transport=udp" }
];

var configuration = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };
var pcPeers = {};
var selfView = document.getElementById("selfView");
var remoteViewContainer = document.getElementById("remoteViewContainer");

async function getLocalStream(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (e) {
    console.log(e);
  }
}

class WebRTC extends Component {
  state = {
    videoSrc: ""
  };

  async componentDidMount() {
    const { roomId } = this.props;

    let stream = await getLocalStream();
    this.setState({ videoSrc: stream });
    joinVideoChat(roomId);
  }

  render() {
    return (
      <div>
        <ReactPlayer
          url={this.state.videoSrc}
          className="react-player"
          playing
          width="100%"
          height="100%"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(WebRTC);
