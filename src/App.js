import React from 'react';
import Recipes from "./components/Recipes"
import SearchBar from "./components/SearchBar"
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to leftovers!
        </p>

        <SearchBar></SearchBar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <Recipes></Recipes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
