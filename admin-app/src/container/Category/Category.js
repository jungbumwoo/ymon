import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from "../../actions";
import Layout from '../../components/Layout/Layout/Layout.js';

const Category = (props) => {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const renderCategories = (categories) => {
        let mycategories = [];
        for(let category of categories){
            mycategories.push(
                <li key={category.name}>
                    {category.name}
                </li>
            );
        }
        return mycategories;
    }

    return(
        <Layout>
            <Container>
                <Row>
                    <Col>
                        <div>
                            <h1>Category</h1>
                            <button>Add</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Category;