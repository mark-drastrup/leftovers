import React from "react";
import LandingPage from "./LandingPage";
import FoodList from "./FoodList";
import { Switch, Route } from "react-router-dom";

export default function Main() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/user/food" component={FoodList} />
      <LandingPage />
    </Switch>
  );
}
