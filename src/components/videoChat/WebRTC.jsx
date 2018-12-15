import React, { Component } from "react";
import ContentEditable from "react-contenteditable";

import {
  Provider,
  Connected,
  Connecting,
  Disconnected,
  Room,
  RequestUserMedia,
  RemoteAudioPlayer,
  Video,
  GridLayout
} from "@andyet/simplewebrtc";

import { connect } from "react-redux";
import { store } from "../../store";

const API_KEY = "6230af90312017c095b4252a";
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;

const mapStateToProps = state => {
  return {
    roomId: state.room.roomId
  };
};

class WebRTC extends Component {
  render() {
    return (
      <Provider configUrl={CONFIG_URL}>
        <RemoteAudioPlayer />
        <Connecting>
          <h1>Connecting...</h1>
        </Connecting>

        <Disconnected>
          <h1>Lost connection. Reattempting to join...</h1>
        </Disconnected>

        <Connected>
          <RequestUserMedia audio video auto />

          <Room name={this.props.roomId} password={this.props.roomId}>
            {({ room, peers, localMedia, remoteMedia }) => {
              if (!room.joined) {
                return <h1>Joining room...</h1>;
              }

              const remoteVideos = remoteMedia.filter(m => m.kind === "video");
              const localVideos = localMedia.filter(
                m => m.kind === "video" && m.shared
              );
              const localScreens = localVideos.filter(m => m.screenCapture);

              return (
                <GridLayout
                  className="videogrid"
                  items={[...localVideos, ...remoteVideos]}
                  renderCell={item => <Video media={item} />}
                />
              );
            }}
          </Room>
        </Connected>
      </Provider>
    );
  }
}

export default connect(mapStateToProps)(WebRTC);
