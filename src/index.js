import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor, history } from "./store";

import './styles/App.scss';

// Uncomment to flush store
// persistor.persist();

ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor} loading={null}>
			<ConnectedRouter history={history} store={store}>
				<div>
					<Switch>
						<Route exact path="/" render={() => <App/>}/>
						<Route render={() => (<div>Not Valid Route</div>)}/>
					</Switch>
				</div>
			</ConnectedRouter>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
