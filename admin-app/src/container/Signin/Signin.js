import React from "react";
import Layout from "../../components/Layout/Layout/Layout";
import Input from "../../components/UI/Input";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { login } from "../../actions";
import { useDispatch } from "react-redux";

const Signin = (props) => {
    const dispatch = useDispatch();
    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email: "jung@baver.com",
            password: "123123"
        }
        dispatch(login(user));
    }
    return(
        <Layout>
            <Container>
                <Row style={{ marginTop: "3rem"}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userLogin}>
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

export default Signin;