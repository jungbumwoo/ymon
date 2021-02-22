import React from "react";
import Layout from "../../components/Layout/Layout/Layout";
import Jumbotron from 'react-bootstrap/Jumbotron';

const Home = (props) => {
  return (
    <Layout>
        <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
            </p>
        </Jumbotron>
    </Layout>
  );
};

export default Home;
