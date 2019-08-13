import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FoodList from "./components/FoodList"
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const fetchRecipes = data => {
  const newAction = {
    type: "FETCH_RECIPES",
    data: data
  };
  return newAction;
};

const updateQuery = data => {
  const newAction = {
    type: "UPDATE_QUERY",
    data: data
  }
  return newAction;
}

const initialState = {
  recipes: [],
  query: ""
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
    <Router>
      <Route exact path="/" component={App} />
      <Route path="/user/food" component={FoodList} />
    </Router>
  </Provider>
);


ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
