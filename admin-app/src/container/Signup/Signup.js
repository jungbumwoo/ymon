import React from "react";
import Layout from "../../components/Layout/Layout/Layout";
import Input from "../../components/UI/Input";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Signup = (props) => {
    return(
        <Layout>
            <Container>
                <Row style={{ marginTop: "3rem"}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input 
                                        label="firstName"
                                        placeholder="firstName"
                                        value=""
                                        type="text"
                                        onChange={() => {}}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input 
                                        label="lastName"
                                        placeholder="lastName"
                                        value=""
                                        type="text"
                                        onChange={() => {}}
                                    />
                                </Col>
                            </Row>
                            <Input 
                                label="Email"
                                placeholder="Eamil"
                                value=""
                                type="text"
                                onChange={() => {}}
                            />
                            <Input 
                                label="Password"
                                placeholder="Password"
                                value=""
                                type="password"
                                onChange={() => {}}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup;