import {openConnection, createRoom as createRoomSocket, joinRoom as joinRoomSocket} from "../utilities/socketClient";
import {
	CREATE_ROOM_SUCCESSFUL,
	UPDATE_USERNAME,
	JOIN_ROOM_SUCCESSFUL,
	JOIN_ROOM_UNSUCCESSFUL,
	JOINING_ROOM
} from "./actionTypes";

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
			console.log('Could not connect.')
		}
	}
};

export const joinRoom = (username, id) => {
	return async dispatch => {
		try {
			dispatch({
				type: JOINING_ROOM
			});
			await joinRoomSocket(username, id);
		} catch (e) {
			console.log('Could not connect.');
		}
	}
}

export const updateUsername = username => {
	return {
		type: UPDATE_USERNAME,
		username
	};
};

export const createRoomSuccessful = roomId => {
	return dispatch => {
		dispatch({
			type: CREATE_ROOM_SUCCESSFUL,
			roomId
		});

		history.push(`/rooms/${roomId}`);
	}
};

export const joinRoomSuccessful = roomId => {
	return dispatch => {
		dispatch({
			type: JOIN_ROOM_SUCCESSFUL,
			roomId
		});

		history.push(`/rooms/${roomId}`);
	}
};

export const joinRoomUnsuccessful = roomId => {
	return {
		type: JOIN_ROOM_UNSUCCESSFUL,
		roomId
	}
};