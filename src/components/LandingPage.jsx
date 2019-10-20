import React from "react";
import SearchBar from "./SearchBar";

const LandingPage = props => {
  return (
    <div className="hero__searchbar">
      <h1>Welcome to Leftovers</h1>
      <h3>
        Leftovers prevents food waste by providing recipes with food you have in
        your fridge
      </h3>
      <SearchBar></SearchBar>
      <p className="hero__helptext">
        Write ingredients separated by a space: "pasta tomato avocado cheese"
      </p>
    </div>
  );
};

export default LandingPage;
