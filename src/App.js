import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import Login from './components/Login';
import { ConnectedRouter } from "react-router-redux";
import { history, store } from "./store";
import { Route, Switch } from "react-router";

class App extends Component {
	render() {
		return (
			<Container>
				<Row>
					<Col lg="12">
						<ConnectedRouter history={history} store={store}>
							<div>
								<Switch>
									<Route exact path="/" render={() => <Login/>}/>
									<Route render={() => (<div>Not Valid Route</div>)}/>
								</Switch>
							</div>
						</ConnectedRouter>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
