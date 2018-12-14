import {
	CREATE_ROOM_SUCCESSFUL,
	UPDATE_USERNAME,
	JOIN_ROOM_SUCCESSFUL,
	JOIN_ROOM_UNSUCCESSFUL, JOINING_ROOM
} from "../../actions/actionTypes";

const initialState = {
	connected: false,
	roomId: null,
	username: '',
	searching: true,
	otherUsers: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_ROOM_SUCCESSFUL:
			return {
				...state,
				connected: true,
				roomId: action.roomId
			};
		case UPDATE_USERNAME:
			return {
				...state,
				username: action.username
			};
		case JOINING_ROOM:
			return {
				...state,
				searching: true
			};
		case JOIN_ROOM_SUCCESSFUL:
			return {
				...state,
				connected: true,
				roomId: action.roomId,
				searching: false
			};
		case JOIN_ROOM_UNSUCCESSFUL:
			return {
				...state,
				connected: false,
				roomId: action.roomId,
				searching: false
			};
		default:
			return state;
	}
}