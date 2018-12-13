import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import application from "./applicationReducer";

export default (history) => combineReducers({
	router: connectRouter(history),
	application
})
