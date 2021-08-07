import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";

import firebase from "./firebase";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import App from "./App";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import store from "./store/store";
import PrivateRoute from "./components/auth/PrivateRoute";

const rrfConfig = {
  userProfile: "users",
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

const Root = () => {
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //login
        history.push("/");
      } else {
        //logout
        history.push("/login");
      }
    });
  }, []);
  return (
    <Switch>
      <PrivateRoute exact path="/">
        <App />
      </PrivateRoute>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <Root />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
