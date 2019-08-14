import React, { Component } from "react";
import { connect } from "react-redux";
import { FormControl } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import axios from "axios"

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    }
  }

  componentDidMount() {
    this.setState({ quantity: this.props.quantity })
  }

  decrement = () => {
    if (this.state.quantity - 1 > 0) {
      this.setState({ quantity: this.state.quantity - 1 }, () => {
        this.props.updateItem(this.props.foodId, this.state.quantity)
      })
    }
  }

  increment = () => {
    this.setState({ quantity: this.state.quantity + 1 }, () => {
      this.props.updateItem(this.props.foodId, this.state.quantity)
    })

  }

  render() {
    return (
      <div style={{ display: "inline", float: "right" }}>
        <FaMinus style={{ fontSize: "16px", marginRight: "5px", cursor: "pointer" }} onClick={() => this.decrement()} /><input type="text" value={this.state.quantity} style={{ width: "30px", textAlign: "center", border: "none" }} readOnly /><FaPlus style={{ fontSize: "16px", marginLeft: "5px", cursor: "pointer" }} onClick={() => this.increment()} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateItem: async (id, data) => {
      const updatedItem = await axios.patch(`/api/users/1/food/${id}`, { quantity: data })
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Counter);

