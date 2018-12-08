import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";

import createRootReducer from "./reducers";

export const history = createBrowserHistory();
const persistedReducer = persistReducer({
	key: 'root',
	storage,
}, createRootReducer(history));

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history), logger];

if (process.env.NODE_ENV === "development") {
	const devToolsExtension = window.devToolsExtension;

	if (typeof devToolsExtension === "function") {
		enhancers.push(devToolsExtension());
	}
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = createStore(persistedReducer, initialState, composedEnhancers);
export const persistor = persistStore(store);

