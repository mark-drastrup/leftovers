import React, { Component } from "react";
import { connect } from "react-redux";
import { FormControl } from 'react-bootstrap';
const { RecipeSearchClient } = require('edamam-api');
const client = new RecipeSearchClient({
  appId: process.env.REACT_APP_API_ID,
  appKey: process.env.REACT_APP_API_KEY
});

class SearchBar extends Component {
  keyPress = (e) => {
    if (e.keyCode === 13) {
      this.props.fetchRecipes(this.props.query)
    }
  }

  render() {
    return (
      <>
        <FormControl type="text" onKeyDown={this.keyPress} onChange={this.props.onChange} value={this.props.query} />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    query: state.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipes: async (query) => {
      console.log("Inside fetch", query)
      const recipes = await client.search({ query: query })
      dispatch({
        type: "FETCH_RECIPES",
        data: recipes.hits
      });
    },
    onChange: (e) => {
      dispatch({
        type: "UPDATE_QUERY",
        data: e.target.value
      })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);