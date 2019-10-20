import React from "react";
import Recipes from "./components/Recipes";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Container className="hero" fluid="true">
        <Row className="hero__row">
          <Col md={12} className="hero__sidebar">
            <Navbar />
            <LandingPage />
            <div></div>
          </Col>
        </Row>
      </Container>
      <Container fluid="true">
        <Row>
          <Recipes></Recipes>
        </Row>
      </Container>
    </div>
  );
}

export default App;
