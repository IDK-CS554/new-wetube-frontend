import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row, Col, Input } from "reactstrap";
import Navbar from "./Navbar";
import Choose from "./ChooseVideo";
import Watch from "./WatchVideo";

import { getUsers, changeRoomType } from "../actions/applicationActions";

const mapStateToProps = state => {
  return {
    roomId: state.application.roomId,
    roomType: state.application.roomType
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUsers, changeRoomType }, dispatch);
};

class Room extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const { getUsers, roomId } = this.props;
    getUsers(roomId);
  }

  searchVideo(e) {
    e.preventDefault();
    this.setState({ query: e.target.query.value });
  }

  render() {
    const { query } = this.state;
    const { roomType } = this.props;
    return (
      <div className="room">
        <Navbar />
        <Container fluid>
          <Row>
            {roomType === "choose" && (
              <Choose
                query={query}
                searchVideo={this.searchVideo.bind(this)}
                changeRoomType={this.props.changeRoomType.bind(this)}
              />
            )}
            {roomType === "watch" && (
              <Watch changeRoomType={this.props.changeRoomType.bind(this)} />
            )}
            <Col lg="3" className="chat-column">
              <div className="chat-container">
                <Input type="text" placeholder="Type message..." />
                <hr />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
