import React, { useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import Input from "../../components/UI/Input";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const Signin = (props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={'/'} />
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

export default Signin;