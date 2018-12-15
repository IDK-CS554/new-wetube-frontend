import {
  openConnection,
  createRoom as createRoomSocket,
  joinRoom as joinRoomSocket,
  sendText as sendTextSocket,
  exitRoom as exitRoomSocket,
  changeRoomType
} from "../utilities/socketClient";
import {
  CREATE_ROOM_SUCCESSFUL,
  UPDATE_USERNAME,
  JOIN_ROOM_SUCCESSFUL,
  JOIN_ROOM_UNSUCCESSFUL,
  JOINING_ROOM,
  USERS_RECEIVED,
  USER_LEFT,
  EXIT_ROOM,
  SEND_TEXT,
  RECEIVED_TEXT,
  ROOM_EMPTY,
  CHANGE_ROOM_TYPE,
  PLAY_VIDEO,
  PAUSE_VIDEO,
  SEEK_VIDEO
} from "./actionTypes";

import { history } from "../store";
import { fetchUsers } from "../utilities/httpApi";

export const connectToSocket = () => {
  return async () => {
    try {
      await openConnection();
    } catch (e) {
      console.log(e);
    }
  };
};

export const createRoom = username => {
  return async () => {
    try {
      await createRoomSocket(username);
    } catch (e) {
      console.log("Could not connect.");
    }
  };
};

export const joinRoom = (username, id) => {
  return async dispatch => {
    try {
      dispatch({
        type: JOINING_ROOM
      });
      await joinRoomSocket(username, id);
    } catch (e) {
      console.log("Could not connect.");
    }
  };
};

export const updateUsername = username => {
  return {
    type: UPDATE_USERNAME,
    username
  };
};

export const createRoomSuccessful = ({ newRoom, username }) => {
  const { roomId, users } = newRoom;
  return dispatch => {
    dispatch({
      type: CREATE_ROOM_SUCCESSFUL,
      roomId,
      users,
      username
    });

    history.push(`/rooms/${roomId}`);
  };
};

export const joinRoomSuccessful = room => {
  const newestUserName = room.users[room.users.length - 1].username;
  return dispatch => {
    dispatch({
      type: JOIN_ROOM_SUCCESSFUL,
      roomId: room.roomId,
      users: room.users,
      newestUserName
    });

    if (!history.location.pathname.includes("rooms")) {
      history.push(`/rooms/${room.roomId}`);
    }
  };
};

export const joinRoomUnsuccessful = roomId => {
  return {
    type: JOIN_ROOM_UNSUCCESSFUL,
    roomId
  };
};

export const getUsers = roomId => {
  return async dispatch => {
    const users = await fetchUsers(roomId);
    dispatch({
      type: USERS_RECEIVED,
      users
    });
  };
};

export const sendText = (text, username, roomId) => {
  return dispatch => {
    dispatch({
      type: SEND_TEXT,
      text,
      username,
      roomId
    });

    sendTextSocket(username, text, roomId);
  };
};

export const receivedText = (text, username, roomId) => {
  return {
    type: RECEIVED_TEXT,
    text,
    username,
    roomId
  };
};

export const userLeft = userId => {
  return dispatch => {
    dispatch({
      type: USER_LEFT,
      userId
    });
  };
};

export const changeRoomAction = (roomId, videoId = null) => {
  return dispatch => {
    dispatch({
      type: CHANGE_ROOM_TYPE,
      videoId,
      roomId
    });
  };
};

export const exitRoom = userId => {
  return dispatch => {
    dispatch({
      type: EXIT_ROOM,
      userId
    });
    exitRoomSocket();
  };
};

export const playVideo = () => {
  return dispatch => {
    dispatch({
      type: PLAY_VIDEO
    });
  };
};

export const seekVideo = currTime => {
  return dispatch => {
    dispatch({
      type: SEEK_VIDEO,
      currTime
    });
  };
};

export const pauseVideo = () => {
  return dispatch => {
    dispatch({
      type: PAUSE_VIDEO
    });
  };
};

export const roomEmpty = roomId => {
  return dispatch => {
    dispatch({
      type: ROOM_EMPTY,
      roomId
    });
  };
};
