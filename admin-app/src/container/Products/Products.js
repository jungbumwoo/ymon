import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout/Layout';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import Input from "../../components/UI/Input";
import { categoryConstants } from '../../actions/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../reducers/product.reducer';

const Products = (props) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId ] = useState('');
    const [productPictures, setProductPicture] = useState([]);
    const [show, setShow] = useState(false);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);

        for(let pic of productPictures){
            form.append('productPicture', pic);
        }

        dispatch(addProduct(form));
        setShow(false);
    }

    const handleShow = () => setShow(true);

    return(
        <Layout children={"whf"}>
            <Container>
                <Row>
                    <Col md={12}>
                        <div>
                            <h1>Products</h1>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
            </Modal>
        </Layout>
    )
}

export default Products;