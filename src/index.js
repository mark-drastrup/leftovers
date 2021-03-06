import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import FoodList from "./components/FoodList";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

const Root = ({ store }) => (
  <Provider store={store}>
    {/* <header style={{ backgroundColor: "#282c34", height: "80px" }}></header> */}
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
