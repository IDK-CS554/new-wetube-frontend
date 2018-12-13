import {store} from '../store';
import io from 'socket.io-client';
import { createRoomSuccessful } from "../actions/applicationActions";

let socket = null;
const dispatch = store.dispatch;
const getState = store.getState;

export const openConnection = () => {
	return new Promise((resolve, reject) => {
		socket = io(`${process.env.REACT_APP_backend_url}/final`);
		socket.on('createRoomSuccessful', roomId => {
			dispatch(createRoomSuccessful(roomId));
		});

		resolve();
	})
};

export const createRoom = username => {
	socket.emit('createRoom', {username})
};