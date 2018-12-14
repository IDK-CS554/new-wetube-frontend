import React, { Component } from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

export class VideoCard extends Component {
  render() {
    const { thumbUrl, title, videoId, changeRoomType } = this.props;
    return (
      <Card onClick={() => changeRoomType(videoId)}>
        <CardImg top width="100%" src={thumbUrl} alt="thumbnail" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
        </CardBody>
      </Card>
    );
  }
}

export default VideoCard;
