import {
  CREATE_ROOM_SUCCESSFUL,
  JOIN_ROOM_SUCCESSFUL,
  JOIN_ROOM_UNSUCCESSFUL,
  RECEIVED_TEXT,
  SEND_TEXT,
  USER_LEFT,
  EXIT_ROOM,
  CHANGE_ROOM_TYPE
} from "../../actions/actionTypes";

const initialState = {
  roomId: null,
  roomType: "choose",
  users: [],
  chat: []
};

const chatObject = (username, roomId, text) => {
  return {
    username,
    text,
    roomId
  };
};

const SYSTEM = "SYSTEM";

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ROOM_TYPE:
      let roomType = state.roomType === "choose" ? "watch" : "choose";
      const { videoId } = action;
      return {
        ...state,
        roomType,
        videoId
      };
    // Do the same thing as RECEIVED_TEXT
    case SEND_TEXT:
    case RECEIVED_TEXT:
      return {
        ...state,
        chat: [
          chatObject(action.username, action.roomId, action.text),
          ...state.chat
        ]
      };
    case CREATE_ROOM_SUCCESSFUL:
      return {
        ...state,
        roomId: action.roomId,
        users: action.users,
        chat: [
          chatObject(
            SYSTEM,
            action.roomId,
            `${action.username} has created the chat!`
          ),
          ...state.chat
        ]
      };
    case JOIN_ROOM_SUCCESSFUL:
      return {
        ...state,
        connected: true,
        roomId: action.roomId,
        searching: false,
        users: action.users,
        chat: [
          chatObject(
            SYSTEM,
            action.roomId,
            `${action.newestUserName} has joined the chat!`
          ),
          ...state.chat
        ]
      };
    case USER_LEFT:
      return {
        ...state,
        users: state.users.filter(u => u.userId !== action.userId)
      };
    case EXIT_ROOM:
      return {
        ...initialState
      };
    case JOIN_ROOM_UNSUCCESSFUL:
      return {
        ...state
      };
    default:
      return state;
  }
};
