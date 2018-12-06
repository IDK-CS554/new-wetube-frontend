import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from "./reducers";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
	const devToolsExtension = window.devToolsExtension;

	if (typeof devToolsExtension === "function") {
		enhancers.push(devToolsExtension());
	}
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(createRootReducer(history), initialState, composedEnhancers);
