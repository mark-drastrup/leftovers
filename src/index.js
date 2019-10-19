import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import FoodList from "./components/FoodList";
import AuthForm from "./components/AuthForm";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

const fetchRecipes = data => {
  const newAction = {
    type: "FETCH_RECIPES",
    data: data
  };
  return newAction;
};

const fetchFood = data => {
  const newAction = {
    type: "FETCH_FOOD",
    data: data
  };
  return newAction;
};

const addFood = data => {
  const newAction = {
    type: "ADD_FOOD",
    data: data
  };
  return newAction;
};

const deleteFood = data => {
  const newAction = {
    type: "DELETE_FOOD",
    data: data
  };
  return newAction;
};

const updateQuery = data => {
  const newAction = {
    type: "UPDATE_QUERY",
    data: data
  };
  return newAction;
};

const initialState = {
  recipes: [],
  query: "",
  food: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RECIPES": {
      const copiedState = Object.assign({}, state);
      copiedState.recipes = [...action.data];
      return copiedState;
    }
    case "UPDATE_QUERY": {
      const copiedState = Object.assign({}, state);
      copiedState.query = action.data;
      return copiedState;
    }
    case "FETCH_FOOD": {
      const copiedState = Object.assign({}, state);
      copiedState.food = [...copiedState.food, ...action.data];
      return copiedState;
    }
    case "ADD_FOOD": {
      const copiedState = Object.assign({}, state);
      copiedState.food = [...copiedState.food, action.data.data[0]];
      console.log(copiedState);
      return copiedState;
    }
    case "DELETE_FOOD": {
      const copiedState = Object.assign({}, state);
      console.log(action.data.data[0]);
      copiedState.food = copiedState.food.filter(
        item => item.id !== action.data.data[0].id
      );
      return copiedState;
    }
    default: {
      return state;
    }
  }
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Root = ({ store }) => (
  <Provider store={store}>
    {/* <header style={{ backgroundColor: "#282c34", height: "80px" }}></header> */}
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/user/food" component={FoodList} />
        <Route path="/login" component={AuthForm} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
