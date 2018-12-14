import { store } from "../store";
import io from "socket.io-client";
import { createRoomSuccessful, joinRoomSuccessful, joinRoomUnsuccessful } from "../actions/applicationActions";

// TODO: i think it's possible for this to be null if a user refreshes inside a room
let socket = null;
const dispatch = store.dispatch;
const getState = store.getState;

export const openConnection = () => {
  return new Promise((resolve, reject) => {
    socket = io(`${process.env.REACT_APP_backend_url}/final`);
    socket.on("createRoomSuccessful", roomId => {
      dispatch(createRoomSuccessful(roomId));
    });

    socket.on("joinRoomSuccessful", payload => {
      const {roomId, username} = payload;
      dispatch(joinRoomSuccessful(roomId));
    });

    socket.on("joinRoomUnsuccessful", roomId => {
      dispatch(joinRoomUnsuccessful(roomId))
    });
    resolve();
  });
};

export const createRoom = username => {
  socket.emit("createRoom", { username });
};

export const joinRoom = (username, roomId) => {
  socket.emit('joinRoom', {username, roomId})
};
