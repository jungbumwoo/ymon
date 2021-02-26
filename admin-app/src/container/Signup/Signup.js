import React, { useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import Input from "../../components/UI/Input";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../actions";

const Signup = (props) => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const userSignup = (e) => {
        e.preventDefault();
        const userinfo = {
            firstName, lastName, email, password
        }
        dispatch(signup(userinfo));
    }

    if (auth.authenticate) {
        return <Redirect to={'/'}/>
    }

    if(user.loading){
        return <p>Loading...</p>
    }

    return(
        <Layout>
            <Container>
                { user.message }
                <Row style={{ marginTop: "3rem"}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input 
                                        label="firstName"
                                        placeholder="firstName"
                                        value={firstName}
                                        type="text"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input 
                                        label="lastName"
                                        placeholder="lastName"
                                        value={lastName}
                                        type="text"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input 
                                label="Email"
                                placeholder="Eamil"
                                value={email}
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input 
                                label="Password"
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
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