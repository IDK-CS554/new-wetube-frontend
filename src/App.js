import React, { Component } from "react";

import Login from "./components/Login";
import Room from "./components/Room";
import { ConnectedRouter } from "react-router-redux";
import { history, store } from "./store";
import { Route, Switch } from "react-router";

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history} store={store}>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Login />} />
            <Route path="/rooms/:roomId" component={Room} />
            <Route render={() => <div>Not Valid Route</div>} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
