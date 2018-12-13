import { CREATE_ROOM_SUCCESSFUL } from "../../actions/actionTypes";

const initialState = {
	connected: false,
	roomId: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_ROOM_SUCCESSFUL:
			return {
				connected: true,
				roomId: action.roomId
			};
		default:
			return state;
	}
}