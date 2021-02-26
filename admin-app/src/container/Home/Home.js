import React from "react";
import Layout from "../../components/Layout/Layout/Layout";
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";

const Home = (props) => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">Side Bar</Col>
          <Col md={10} style={{ marginLeft: `auto`}}>Container</Col>
        </Row>
      </Container>
        {/* <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
            </p>
        </Jumbotron> */}
    </Layout>
  );
};

export default Home;
