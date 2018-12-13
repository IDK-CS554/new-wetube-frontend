import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  Button,
  CardSubtitle,
  CardTitle,
  CardText
} from "reactstrap";

export class VideoCard extends Component {
  render() {
    const { thumbUrl, title } = this.props;
    return (
      <Card>
        <CardImg top width="100%" src={thumbUrl} alt="thumbnail" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    );
  }
}

export default VideoCard;
