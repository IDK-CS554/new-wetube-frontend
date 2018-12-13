import { CREATE_ROOM_SUCCESSFUL, UPDATE_USERNAME } from "../../actions/actionTypes";

const initialState = {
	connected: false,
	roomId: null,
	username: ''
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
		default:
			return state;
	}
}