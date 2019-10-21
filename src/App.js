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
        <Row>
          <Col md={12}>
            <Navbar />
            <Main />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
