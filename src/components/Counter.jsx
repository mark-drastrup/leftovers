import React, { Component } from "react";
import { FormControl } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default class Counter extends Component {
  render() {
    return (
      <div style={{ display: "inline", float: "right" }}>
        <FaMinus style={{ fontSize: "16px", marginRight: "5px", cursor: "pointer" }} /><input type="text" value={1} style={{ width: "30px", textAlign: "center", border: "none" }} /><FaPlus style={{ fontSize: "16px", marginLeft: "5px", cursor: "pointer" }} />
      </div>
    )
  }
}

