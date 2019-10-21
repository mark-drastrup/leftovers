import React from "react";
import "../App.css";

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#">
            Signup
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
