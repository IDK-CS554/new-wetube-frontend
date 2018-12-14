import {
  CREATE_ROOM_SUCCESSFUL,
  UPDATE_USERNAME,
  JOIN_ROOM_SUCCESSFUL,
  JOIN_ROOM_UNSUCCESSFUL,
  JOINING_ROOM
} from "../../actions/actionTypes";

const initialState = {
  connected: false,
  searching: true,
  username: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.username
      };
    case CREATE_ROOM_SUCCESSFUL:
      return {
        ...state,
        connected: true,
        searching: false
      };
    case JOIN_ROOM_SUCCESSFUL:
      return {
        ...state,
        connected: true,
        searching: false
      };
    case JOIN_ROOM_UNSUCCESSFUL:
      return {
        ...state,
        connected: false,
        searching: false
      };
    case JOINING_ROOM:
      return {
        ...state,
        searching: true
      };
    default:
      return state;
  }
};
