import { store } from "../store";
import io from "socket.io-client";
import {
  createRoomSuccessful,
  joinRoomSuccessful,
  joinRoomUnsuccessful
} from "../actions/applicationActions";

let socket = null;
const { dispatch, getState } = store;

export const openConnection = () => {
  return new Promise((resolve, reject) => {
    socket = io(`${process.env.REACT_APP_backend_url}/final`);
    socket.on("createRoomSuccessful", room => {
      console.log(room);
      dispatch(createRoomSuccessful(room));
    });

    socket.on("joinRoomSuccessful", room => {
      console.log("in join room socket");
      dispatch(joinRoomSuccessful(room));
    });

    socket.on("joinRoomUnsuccessful", roomId => {
      dispatch(joinRoomUnsuccessful(roomId));
    });
    resolve();
  });
};

export const createRoom = username => {
  socket.emit("createRoom", { username });
};

export const joinRoom = (username, roomId) => {
  socket.emit("joinRoom", { username, roomId });
};

export const joinVideoChat = roomId => {
  socket.emit("joinVideoChat", roomId);
};
