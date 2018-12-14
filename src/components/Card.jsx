import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

import { changeRoomType } from "../utilities/socketClient";

const mapStateToProps = state => {
  return {
    roomId: state.room.roomId
  };
};

export class VideoCard extends Component {
  render() {
    const { thumbUrl, title, videoId, roomId } = this.props;
    return (
      <Card onClick={() => changeRoomType(roomId, videoId)}>
        <CardImg top width="100%" src={thumbUrl} alt="thumbnail" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
        </CardBody>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(VideoCard);
