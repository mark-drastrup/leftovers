import React from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Container fluid="true">
        <Row className="vh-100 no-gutters">
          <Col md={12} className="d-flex flex-column">
            <Navbar />
            <Main />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
