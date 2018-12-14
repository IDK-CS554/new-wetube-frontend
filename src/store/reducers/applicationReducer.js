import {
	CREATE_ROOM_SUCCESSFUL,
	UPDATE_USERNAME,
	JOIN_ROOM_SUCCESSFUL,
	JOIN_ROOM_UNSUCCESSFUL,
	JOINING_ROOM,
	USERS_RECEIVED,
	CHANGE_ROOM_TYPE, RECEIVED_TEXT, SEND_TEXT
} from "../../actions/actionTypes";
import { SYSTEM } from "../../constants";

const initialState = {
  connected: false,
  roomId: null,
  username: "",
  searching: true,
  users: [],
  roomType: "choose",
  chat: []
};

const chatObject = (username, roomId, text) => {
	return {
		username,
		text,
    roomId
	}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ROOM_TYPE:
      let roomType = state.roomType === "choose" ? "watch" : "choose";
      const { videoId } = action;
      if (action.videoId) {
        return {
          ...state,
          roomType,
          videoId
        };
      }
      return {
        ...state,
        roomType
      };
    case CREATE_ROOM_SUCCESSFUL:
      return {
        ...state,
	      connected: true,
	      searching: false,
	      roomId: action.roomId,
	      users: action.users,
	      chat: [chatObject(SYSTEM, action.roomId, `${state.username} has created the chat!`), ...state.chat]
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
        searching: false,
	      users: action.users,
	      chat: [chatObject(SYSTEM, action.roomId, `${action.newestUserName} has joined the chat!`), ...state.chat]
      };
    case JOIN_ROOM_UNSUCCESSFUL:
      return {
        ...state,
        connected: false,
        roomId: action.roomId,
        searching: false
      };
    case USERS_RECEIVED:
      return {
        ...state,
        users: action.users
      };
    case SEND_TEXT:
    case RECEIVED_TEXT:
	    return {
        ...state,
	      chat: [chatObject(action.username, action.roomId, action.text), ...state.chat]
      }
    default:
      return state;
  }
};
