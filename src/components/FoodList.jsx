import React, { Component } from "react";
import Recipes from "./Recipes";
import { FaTimes } from 'react-icons/fa';
import { connect } from "react-redux";
import { Container, Row, Col, Card, Button, FormControl, ListGroup } from 'react-bootstrap';
import Counter from "./Counter"
import '../index.css';
import axios from "axios";

class FoodList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }

  componentDidMount() {
    this.props.fetchFood();
  }

  /*   handleClick = () => {
      this.props.fetchRecipes(this.props.food)
    } */

  handleOnChange = e => {
    this.setState({ text: e.target.value })
  }

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.props.addItem(this.state.text)
      this.setState({ text: "" })
    }
  }

  render() {
    const foodItems = this.props.food.map((food, index) => {
      return (
        <ListGroup.Item key={food.id} style={{ width: "50%", }}>
          <FaTimes style={{ cursor: "pointer" }} onClick={() => this.props.deleteItem(food.id)}></FaTimes> {food.item} <Counter />
        </ListGroup.Item>
      )
    })
    return (
      <>
        <Container className="list" fluid="true">
          <Container>
            <Row>
              <Col md={12}>
                <div className="list_title">
                  <h1>Your Fridge</h1>
                  <button className="recipe__btn btn btn-primary" onClick={() => this.props.fetchRecipes(this.props.food)}>Get recipes</button>
                </div>
                <Card className="listgroup">
                  <ListGroup style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: "0px" }}>
                    {foodItems}
                    <FormControl className="listgroup__button" onKeyDown={this.handleKeyDown} value={this.state.text} onChange={this.handleOnChange} placeholder="Add leftover" />
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container className="recipes" fluid="true">
          <Row>
            <Recipes></Recipes>
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    food: state.food,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFood: async () => {
      const food = await axios.get("/api/users/1/food/");
      dispatch({
        type: "FETCH_FOOD",
        data: food.data
      });
    },
    fetchRecipes: async (query) => {
      const queryStr = query.reduce((acc, current) => {
        return `${acc.item} ${current.item}`
      })

      const result = await axios.post("/api/recipes", { query: queryStr })

      dispatch({
        type: "FETCH_RECIPES",
        data: result.data.hits
      });
    },
    addItem: async (item) => {
      const newItem = await axios.post("/api/users/1/food/", { item: item, quantity: 1 })
      dispatch({
        type: "ADD_FOOD",
        data: newItem
      })
    },
    deleteItem: async (id) => {
      const removedItem = await axios.delete(`/api/users/1/food/${id}`)
      dispatch({
        type: "DELETE_FOOD",
        data: removedItem
      })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodList);