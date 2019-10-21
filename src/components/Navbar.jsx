import React from "react";
import "../App.css";

const Navbar = props => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">
            Signup
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
