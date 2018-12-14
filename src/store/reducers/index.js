import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import application from "./applicationReducer";
import room from "./roomReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    application,
    room
  });
