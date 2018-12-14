import React, { Component } from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

import {changeRoomType} from "../actions/applicationActions";

const mapDispatchToProps = dispatch => {
  return bindActionCreators({changeRoomType}, dispatch);
};

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

export default connect(null, mapDispatchToProps)(VideoCard);
