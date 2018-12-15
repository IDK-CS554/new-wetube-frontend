import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Button,
  Nav
} from "reactstrap";

import { exitRoom } from "../actions/applicationActions";

import { changeRoomType } from "../utilities/socketClient";

const mapStateToProps = state => {
  return {
    roomType: state.room.roomType,
    videoId: state.room.videoId,
    roomId: state.room.roomId,
    username: state.application.username
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ exitRoom }, dispatch);
};

class NavbarComponent extends Component {
  exitRoom = (e) => {
    e.preventDefault()
    this.props.exitRoom();
    this.props.history.replace("/");
  };

  render() {
    const { roomType, videoId, roomId, username } = this.props;
    return (
      <React.Fragment>
        <Navbar expand="lg">
          <NavbarBrand onClick={e => this.exitRoom(e)} href="">WeTube</NavbarBrand>
          <NavbarToggler className="mr-2" />
          <Nav className="ml-auto" navbar>
	          <NavItem>
		          <p>Welcome, {username || ''}!</p>
	          </NavItem>
            {roomType === "watch" && videoId && (
              <NavItem>
                <Button onClick={() => changeRoomType(roomId)} color="default">
                  Choose Another Video
                </Button>
              </NavItem>
            )}
            <NavItem>
              <Button color="danger" onClick={this.exitRoom}>
                Exit Room
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavbarComponent)
);
