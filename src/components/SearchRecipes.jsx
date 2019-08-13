import React, { Component } from "react";
const { RecipeSearchClient } = require('edamam-api');
const client = new RecipeSearchClient({
  appId: process.env.REACT_APP_API_ID,
  appKey: process.env.REACT_APP_API_KEY
});

export default class SearchRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null
    }
  }

  componentDidMount() {
    this.fetchRecipes()
  }

  fetchRecipes = async () => {
    const results = await client.search({ query: 'tomato pasta avocado' });
    /*  this.setState({ response: results }) */
    console.log(results)
  }

  render() {
    return (<h1>{this.state.response}</h1>)
  }
}


