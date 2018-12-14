import { store } from "../store";
import io from "socket.io-client";
import {
	createRoomSuccessful,
	joinRoomSuccessful,
	joinRoomUnsuccessful, receivedText
} from "../actions/applicationActions";
import { SYSTEM } from "../constants";

let socket = null;
const { dispatch } = store;

export const openConnection = () => {
  return new Promise((resolve, reject) => {
  	if (socket !== null) {
  		reject("Connection already open");
  		return;
	  }
    socket = io(`${process.env.REACT_APP_backend_url}/final`);
    socket.on("createRoomSuccessful", room => {
      dispatch(createRoomSuccessful(room));
    });

    socket.on("joinRoomSuccessful", room => {
      console.log("in join room socket");
      dispatch(joinRoomSuccessful(room));
    });

    socket.on("joinRoomUnsuccessful", roomId => {
      dispatch(joinRoomUnsuccessful(roomId));
    });

    socket.on("receivedText", payload => {
	    const {username, text, roomId} = payload;
	    dispatch(receivedText(text, username, roomId));
    });

    socket.on("userLeft", payload => {
    	const {username, roomId, userId} = payload;
    	console.log('user left in socket client');
    	dispatch(receivedText(`${username} has left the room.`, SYSTEM, roomId));
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

export const sendText = (username, text, roomId) => {
	socket.emit('sendText', {username, text, roomId});
};

export const exitRoom = () => {
	socket.emit('exitRoom');
};
