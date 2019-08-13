import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from 'react-bootstrap';

class Recipes extends Component {

  render() {
    console.log(this.props.recipes)
    if (this.props.recipes.length !== 0) {
      const recipes = this.props.recipes.map((recipe, index) => {
        return (
          <Card key={index}>
            <Card.Img variant="top" src={recipe.recipe.image} alt="Food" />
            <Card.Body>
              <Card.Title>{recipe.recipe.label}</Card.Title>
              {recipe.recipe.ingredientLines.map((ingredient, index) => <Card.Text key={index}>{ingredient}</Card.Text>)}
            </Card.Body>

          </Card>
        )
      })
      return (
        <div>
          {recipes}
        </div>
      )
    }
    return (<div>test</div>)
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipes: () => {
      dispatch({
        type: "FETCH_RECIPES",
        data: "Ramen"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
