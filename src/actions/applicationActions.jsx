import {openConnection, createRoom as createRoomSocket} from "../utilities/socketClient";
import { CREATE_ROOM_SUCCESSFUL, UPDATE_USERNAME } from "./actionTypes";

import {history} from "../store";

export const connectToSocket = () => {
	return async () => {
		try {
			await openConnection();
		} catch (e) {
			console.log('Could not connect to socket client. Retrying...');
		}
	}
};

export const createRoom = username => {
	return async () => {
		try {
			await createRoomSocket(username);
		} catch (e) {
			console.log('Could not create room')
		}
	}
};

export const updateUsername = username => {
	return {
		type: UPDATE_USERNAME,
		username
	};
}

export const createRoomSuccessful = roomId => {
	return dispatch => {
		dispatch({
			type: CREATE_ROOM_SUCCESSFUL,
			roomId
		});

		history.push(`/rooms/${roomId}`);
	}
};