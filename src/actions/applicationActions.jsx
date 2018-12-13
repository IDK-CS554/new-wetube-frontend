import {openConnection, createRoom as createRoomSocket} from "../utilities/socketClient";
import { CREATE_ROOM_SUCCESSFUL } from "./actionTypes";

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

export const createRoomSuccessful = roomId => {
	return {
		type: CREATE_ROOM_SUCCESSFUL,
		roomId
	}
};