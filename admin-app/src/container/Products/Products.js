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

    const createCategoryList = (categories, options =[]) => {
        for(let cat of categories){
            options.push({
                name: cat.name,
                value: cat._id
            })
            if(cat.children.length > 0){
                createCategoryList(cat.children, options)
            }
        }
        return options
    }

    const handleShow = () => setShow(true);

    const handleProductPictures = (e) => {
        setProductPicture([
            ...productPictures,
            e.target.files[0]
        ])
    };

    return(
        <Layout>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display:'flex', justifyContent: 'space-around' }}>
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
                <Modal.Body>
                    <Input
                        label="Name"
                        value={name}
                        placeholder={`Category Name`}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="Quantity"
                        value={quantity}
                        placeholder={`Quantity`}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <Input
                        label="Price"
                        value={price}
                        placeholder={`Price`}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <Input
                        label="Description"
                        value={description}
                        placeholder={`Description Name`}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}>
                        <options>select category</options>
                        {
                            createCategoryList(category.categories).map(option => 
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>

                    {
                        productPictures.length > 0 ?
                        productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                    }

                    <input type="file" name="productPicture" onChange={handleProductPictures} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Products;