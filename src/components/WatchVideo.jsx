import React, { Component } from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = state => {
  return {
    videoId: state.application.videoId
  };
};

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ getUsers, changeRoomType }, dispatch);
// };

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
